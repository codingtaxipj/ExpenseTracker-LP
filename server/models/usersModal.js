import mongoose from "mongoose";
import { mongoConnectDB } from "../database/connection.js";
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    uniqe: true,
    minLength: 6,
  },
  userEmail: {
    type: String,
    required: true,
    uniqe: true,
  },
  userPassword: {
    type: String,
    required: true,
    minLength: 8,
  },
});
const usersDB = await mongoConnectDB("auth-db");
const userModal = usersDB.model("users", userSchema);
export { userModal };
