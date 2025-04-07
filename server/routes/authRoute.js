import express from "express";

import { validateUser, validateLogin } from "../middlewares/authValidation.js";
import { login, register, user } from "../controllers/authController.js";
const router = express.Router();

router.post("/sign-up", validateUser, register);
router.post("/login", validateLogin, login);
router.get("/user", user);

export { router as authRouter };
