import multer from "multer";
import path from "path";
import { uploadDir } from "../server.js";

const profileStorage = multer.diskStorage({
  // 'destination' is the folder where the file will be saved.
  destination: (req, file, cb) => {
    // We direct all files to our specific profile picture directory.
    cb(null, uploadDir);
  },
  // 'filename' determines the name of the file inside the destination folder.
  filename: (req, file, cb) => {
    // We create a unique filename to prevent overwrites.
    // e.g., avatar-1678886400000-123456789.jpeg
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, "avatar-" + uniqueSuffix + extension);
  },
});

// We initialize Multer with our storage configuration.
// This 'upload' constant can now be imported and used in any route that needs to handle file uploads.
export const upload = multer({ storage: profileStorage });
