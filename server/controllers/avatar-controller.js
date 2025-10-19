import { PORT, uploadDir } from "../server.js";

export const avatarUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .send({ message: "Error: File could not be uploaded." });
    }

    console.log("avatar", req.file);

    const fileUrl = `http://localhost:${PORT}/users/upload/profile/${req.file.filename}`;

    res
      .status(200)
      .send({ message: "Avatar uploaded successfully!", url: fileUrl });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).send({ message: "Server error while saving avatar." });
  } finally {
  }
};
