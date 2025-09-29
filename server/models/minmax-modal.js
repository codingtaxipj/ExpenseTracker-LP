/* REVIEW - modal is the database design to store value
 ** NOTE - it will be used inside controller when injecting the data in DB
 */

import mongoose from "mongoose";
import { primaryConnection } from "../database/connection.js";
const Schema = mongoose.Schema;

const minmaxMonth = new Schema(
  {
    month: { type: Number, required: true, index: true },
    total: { type: Number, required: true },
  },
  { _id: false,}
);
const minmaxPrime = new Schema(
  {
    name: { type: String, required: true, index: true },
    total: { type: Number, required: true },
  },
  { _id: false,  }
);
const minmaxSub = new Schema(
  {
    primeName: { type: String, required: true, index: true },
    subName: { type: String, required: true, index: true },
    total: { type: Number, required: true },
  },
  { _id: false, }
);

const minmaxSchema = new Schema(
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
    isTypeExpense: {
      type: Boolean,
      index: true,
      required: true,
    },
    maxMonth: {
      type: minmaxMonth,
      required: true,
    },
    minMonth: {
      type: minmaxMonth,
      required: true,
    },
    maxPrime: {
      type: minmaxPrime,
      required: true,
    },
    minPrime: {
      type: minmaxPrime,
      required: true,
    },
    maxSub: [minmaxSub],
    minSub: [minmaxSub],
  },
  {
    collection: "default-minmax", // <-- this line overrides pluralization of adding "s" at last of collection name
    timestamps: true,
    
  }
);
minmaxSchema.index({ userID: 1, year: 1, isTypeExpense: 1 }, { unique: true });

const minmaxModal = primaryConnection.model("default-minmax", minmaxSchema);
export { minmaxModal };
