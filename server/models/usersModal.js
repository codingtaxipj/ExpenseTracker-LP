import mongoose from "mongoose";
import { mongoConnectDB } from "../database/connection.js";
const Schema = mongoose.Schema;

const userRegister = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    match: /^[a-zA-Z0-9]+$/, // Only letters and numbers
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Valid email format
  },
  userPassword: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const usersDB = await mongoConnectDB("auth-db");
const userRegisterModal = usersDB.model("users", userRegister);
export { userRegisterModal };
