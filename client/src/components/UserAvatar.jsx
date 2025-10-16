// For selecting the file
import { useDropzone } from "react-dropzone";
// For cropping the image
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css"; // Don't forget the styles
import userPlaceholderImage from "@/assets/user/user-placeholder.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import React, { useState, useRef, useCallback } from "react";
import { Button } from "./ui/button";
import { Slider } from "@/components/ui/slider";
import Flexcol from "./section/flexcol";
import ExpButton from "./buttons/exp-button";
import { useDispatch } from "react-redux";
import { setProfileImage } from "@/redux/slices/user-slice";

/**
 * A helper function to create a Blob from a cropped image on a canvas.
 * This function now also handles resizing and compression.
 * @param {HTMLImageElement} image - The source image element.
 * @param {Object} crop - The crop parameters from react-image-crop.
 * @param {string} fileName - The desired name for the output file.
 * @param {number} maxWidth - The maximum width for the output image.
 * @returns {Promise<Blob>} A promise that resolves with the resized and compressed image Blob.
 */
function getCroppedImg(image, crop, fileName, maxWidth = 512) {
  // Create a new canvas element to draw the cropped image
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // --- NEW: RESIZING LOGIC ---
  // Determine the target dimensions for resizing
  let targetWidth = crop.width;
  let targetHeight = crop.height;

  // If the cropped image is wider than our max width, we need to scale it down
  if (crop.width > maxWidth) {
    const scaleFactor = maxWidth / crop.width;
    targetWidth = maxWidth;
    targetHeight = crop.height * scaleFactor;
  }

  // Set the final canvas dimensions based on the resizing logic
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");

  // Draw the cropped and resized image onto the canvas.
  // The browser's drawImage function provides high-quality downscaling.
  ctx.drawImage(
    image,
    crop.x * scaleX, // Source X from original image
    crop.y * scaleY, // Source Y from original image
    crop.width * scaleX, // Source Width from original image
    crop.height * scaleY, // Source Height from original image
    0, // Destination X on canvas
    0, // Destination Y on canvas
    targetWidth, // Destination Width on canvas (resized)
    targetHeight, // Destination Height on canvas (resized)
  );

  // Return a promise that resolves with the canvas content as a Blob
  return new Promise((resolve, reject) => {
    // --- NEW: COMPRESSION LOGIC ---
    // canvas.toBlob can take output format and quality as arguments
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          reject(new Error("Canvas is empty"));
          return;
        }
        // Attach the filename to the Blob
        blob.name = fileName;
        resolve(blob);
      },
      "image/jpeg",
      0.8,
    ); // Compress to 80% quality JPEG for smaller file size
  });
}

const UserAvatar = () => {
  const dispatch = useDispatch();
  // URL of the final, uploaded avatar to display
  const [finalAvatarUrl, setFinalAvatarUrl] = useState(userPlaceholderImage);
  // State for the main menu modal (Upload/Remove/Cancel)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for the image cropping/editor modal
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // The source of the image file selected by the user
  const [imgSrc, setImgSrc] = useState("");

  // State for the crop tool. `crop` is the current selection.
  const [crop, setCrop] = useState();
  // `completedCrop` is the final crop after user interaction.
  const [completedCrop, setCompletedCrop] = useState(null);

  // State for the zoom slider
  const [scale, setScale] = useState(1);
  // State for the image rotation slider
  const [rotate, setRotate] = useState(0);

  // Loading state for the upload button
  const [isLoading, setIsLoading] = useState(false);

  // A reference to the image element being cropped
  const imgRef = useRef(null);

  /**
   * Called when a file is dropped or selected.
   * It reads the file and opens the editor modal.
   */
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      // Close the first modal
      setIsMenuOpen(false);

      // Read the file and set the image source
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
        // Open the second modal (the editor)
        setIsEditorOpen(true);
      });
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, []);

  /**
   * useDropzone hook provides the `open` function to programmatically
   * trigger the file selection dialog. We don't need the drag-n-drop UI here.
   */
  const { open } = useDropzone({
    onDrop,
    noClick: true, // We trigger it manually, so disable the default click handler
    noKeyboard: true,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
  });

  /**
   * This function is called when the image first loads in the editor.
   * It sets up the initial centered, 1:1 aspect ratio crop selection.
   * @param {React.SyntheticEvent<HTMLImageElement>} e - The image load event.
   */
  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    // `centerCrop` and `makeAspectCrop` are helpers from react-image-crop
    const crop = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, 1, width, height),
      width,
      height,
    );
    setCrop(crop);
    // Store the image element ref
    imgRef.current = e.currentTarget;
  }

  /**
   * Handles the final upload. It gets the cropped image data,
   * creates a FormData object, and sends it to the backend.
   */
  const handleUpload = async () => {
    if (completedCrop && imgRef.current) {
      setIsLoading(true);
      try {
        // Get the cropped, resized, and compressed image as a Blob
        const croppedImageBlob = await getCroppedImg(
          imgRef.current,
          completedCrop,
          "avatar.jpeg", // Changed to .jpeg to reflect the new format
        );

        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append("avatar", croppedImageBlob);

       await dispatch(setProfileImage({ formData })).unwrap();

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();

        // Update the displayed avatar with the new URL from the server
        setFinalAvatarUrl(data.url);

        // Close the editor modal
        setIsEditorOpen(false);
      } catch (error) {
        console.error("Error uploading avatar:", error);
        // You should add user-facing error handling here (e.g., a toast notification)
      } finally {
        setIsLoading(false);
        // Reset state for the next upload
        setImgSrc("");
        setCrop(undefined);
        setCompletedCrop(null);
        setScale(1);
        setRotate(0);
      }
    }
  };

  /**
   * Handles the "Remove Photo" action.
   * In a real app, this would likely make an API call to your backend
   * to delete the user's avatar file and update their profile.
   */
  const handleRemove = () => {
    // For this example, we'll just reset to the default placeholder.
    console.log("Removing photo...");
    setFinalAvatarUrl(userPlaceholderImage);
    setIsMenuOpen(false);
  };

  return (
    <>
      <Avatar className="mx-2 size-[60px] cursor-pointer rounded-md">
        <AvatarImage
          onClick={() => setIsMenuOpen(true)}
          src={finalAvatarUrl}
          alt="User Avatar"
        />
        <AvatarFallback className="bg-exp-a0 rounded-md" />
      </Avatar>

      {/* MODAL 1: The main menu (Upload/Remove/Cancel) */}
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="bg-dark-a3 border-dark-a4 [&>button]:hidden">
          <Flexcol className="gap-2">
            {/* The "Upload" button calls the `open` function from useDropzone */}
            <ExpButton custom_textbtn className={"bg-exp-a4"} onClick={open}>
              Upload New
            </ExpButton>
            <ExpButton
              custom_textbtn
              className={"bg-slate-a1"}
              onClick={handleRemove}
            >
              Remove Current
            </ExpButton>
            <ExpButton
              custom_textbtn
              className={"bg-slate-a1"}
              onClick={() => setIsMenuOpen(false)}
            >
              Cancel
            </ExpButton>
          </Flexcol>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: The Image Editor/Cropper */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit and Crop Image</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 p-4">
            {/* The ReactCrop component */}
            <div className="aspect-square w-full max-w-xs">
              {imgSrc && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1} // Enforce 1:1 aspect ratio
                  circularCrop // Display a circular crop selection
                >
                  <img
                    ref={imgRef}
                    alt="Crop preview"
                    src={imgSrc}
                    style={{
                      transform: `scale(${scale}) rotate(${rotate}deg)`,
                    }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              )}
            </div>

            {/* Zoom Slider */}
            <div className="w-full max-w-xs">
              <label htmlFor="zoom" className="text-sm font-medium">
                Zoom
              </label>
              <Slider
                id="zoom"
                min={1}
                max={3}
                step={0.1}
                defaultValue={[scale]}
                onValueChange={(value) => setScale(value[0])}
              />
            </div>

            {/* Rotation Slider - A nice bonus feature */}
            <div className="w-full max-w-xs">
              <label htmlFor="rotate" className="text-sm font-medium">
                Rotate
              </label>
              <Slider
                id="rotate"
                min={-180}
                max={180}
                step={1}
                defaultValue={[rotate]}
                onValueChange={(value) => setRotate(value[0])}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserAvatar;
