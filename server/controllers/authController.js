/* eslint-disable no-undef */
import { userModal } from "../models/usersModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const register = async (req, res) => {
  try {
    const data = req.body;
    const user = await userModal.findOne({ userEmail: data.userEmail });
    if (user) {
      res
        .status(409)
        .json({ message: `User Email:${data.userEmail} already exist.` });
    }
    const newUser = await new userModal(data);
    newUser.userPassword = await bcrypt.hash(data.userPassword, 10);
    await newUser.save();
    res.status(201).json({ message: `User Registered` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to Register User" });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await userModal.findOne({ userEmail: data.userEmail });

    if (!user) {
      res.status(403).json({ message: `Auuthentication failed Email` });
    }
    const authPass = await bcrypt.compare(data.userPassword, user.userPassword);
    if (!authPass) {
      res.status(403).json({ message: `Auuthentication failed Password` });
    }
    const jwtToken = jwt.sign(
      { userEmail: user.userEmail, id: user._id },
      process.env.JWT_Secret_KEY,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: `User Logged Inn`,
      jwtToken,
      email: user.userEmail,
      username: user.userName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to Login User" });
  }
};

export { register, login };
