import mongoose from "mongoose";
import { mongoConnectDB } from "../database/connection.js";
const Schema = mongoose.Schema;
const maxSchema = new Schema(
  {
    isPrimeCategory: {
      type: Boolean,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    categoryTotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    collection: "default-user-max", // <-- this line overrides pluralization of adding "s" at last of collection name
  }
);

const maxDB = await mongoConnectDB("max-db");
const maxExpenseModal = maxDB.model("default-user-max", maxSchema);
export { maxExpenseModal };
