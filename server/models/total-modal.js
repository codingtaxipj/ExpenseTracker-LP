/* REVIEW - modal is the database design to store value
 ** NOTE - it will be used inside controller when injecting the data in DB
 */

import mongoose from "mongoose";
import { mongoConnectDB } from "../database/connection.js";
const Schema = mongoose.Schema;
const monthList = new Schema(
  {
    month: { type: Number, required: true, index: true },
    total: { type: Number, required: true },
  },
  { _id: false }
);
const primeList = new Schema(
  {
    name: { type: String, required: true, index: true },
    total: { type: Number, required: true },
  },
  { _id: false }
);
const subList = new Schema(
  {
    primeName: { type: String, required: true, index: true },
    subName: { type: String, required: true, index: true },
    total: { type: Number, required: true },
    monthList: [monthList],
  },
  { _id: false }
);
const totalSchema = new Schema(
  {
    userID: {
      type: Number,
      required: true,
      index: true,
      unique: false,
    },
    year: {
      type: Number,
      required: true,
      index: true,
    },
    total: {
      type: Number,
      required: true,
    },
    monthList: [monthList],
    primeList: [primeList],
    subList: [subList],
  },
  {
    collection: "default-total", // <-- this line overrides pluralization of adding "s" at last of collection name
    timestamps: true,
  }
);
totalSchema.index({ userID: 1, year: 1 }, { unique: true });
const mainDB = await mongoConnectDB("expense-db");
const totalModal = mainDB.model("default-total", totalSchema);
export { totalModal };
