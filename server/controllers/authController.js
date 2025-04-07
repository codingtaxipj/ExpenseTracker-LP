/* eslint-disable no-undef */
import { userRegisterModal } from "../models/usersModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const register = async (req, res) => {
  try {
    const data = req.body;
    const userEmail = await userRegisterModal.findOne({
      userEmail: data.userEmail,
    });
    if (userEmail) {
      return res.status(409).json({ message: `Email already exist.` });
    }
    const userName = await userRegisterModal.findOne({
      userName: data.userName,
    });
    if (userName) {
      return res.status(409).json({ message: `Username is taken.` });
    }
    const newUser = await new userRegisterModal(data);
    newUser.userPassword = await bcrypt.hash(data.userPassword, 10);
    await newUser.save();
    res.status(200).json({ message: `User Registered`, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to Register User" });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await userRegisterModal.findOne({ userEmail: data.userEmail });

    if (!user) {
      return res
        .status(403)
        .json({ message: `Invalid email. Please enter a registered email.` });
    }
    const authPass = await bcrypt.compare(data.userPassword, user.userPassword);
    if (!authPass) {
      return res
        .status(403)
        .json({ message: `Oops! That’s not the right password.` });
    }
    const jwtToken = jwt.sign(
      { userEmail: user.userEmail, id: user._id },
      process.env.JWT_Secret_KEY,
      { expiresIn: "24h" }
    );

    res.cookie("jwt", jwtToken, { httpOnly: true });
    res.cookie("id", user._id, { httpOnly: true });

    res.status(200).json({
      message: `User Logged Inn`,
      jwtToken,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      userEmail: user.userEmail,
      userID: user._id,
    });
  } catch (error) {
    console.error("Login Error:", error); // Log error in backend
    return res.status(500).json({ message: "Failed to Login User" });
  }
};
const user = async (req, res) => {
  const token = req.cookies?.jwt;
  if (token) console.log(token);
  if (!token) console.log("token dosenot exist");
};

export { register, login, user };
