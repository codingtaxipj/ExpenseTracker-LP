/* REVIEW - modal is the database design to store value
 ** NOTE - it will be used inside controller when injecting the data in DB
 */

import mongoose from "mongoose";
import { mongoConnectDB } from "../database/connection.js";
const Schema = mongoose.Schema;
const budgetSchema = new Schema(
  {
    userID: {
      type: Number,
      required: true,
      index: true,
      unique: false,
    },
    budgetAmount: {
      type: Number,
      required: true,
    },
    activeFrom: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "default-budget", // <-- this line overrides pluralization of adding "s" at last of collection name
    timestamps: true,
  }
);

const mainDB = await mongoConnectDB("expense-db");
const budgetModal = mainDB.model("default-budget", budgetSchema);
export { budgetModal };
