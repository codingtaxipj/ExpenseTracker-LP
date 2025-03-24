import express from "express";
import { validateUser,validateLogin } from "../middlewares/authValidation.js";
import { login, register } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", validateUser, register);
router.post("/login", validateLogin, login);

export { router as authRouter };
