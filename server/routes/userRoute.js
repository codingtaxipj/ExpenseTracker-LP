import express from "express";

import { avatarUpload } from "../controllers/avatar-controller.js";
import { upload } from "../middlewares/multer.js";
export const userRouter = express.Router();

userRouter.post("/avatar-upload", upload.single("avatar"), avatarUpload);
