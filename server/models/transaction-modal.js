/* REVIEW - modal is the database design to store value
 ** NOTE - it will be used inside controller when injecting the data in DB
 */

import mongoose from "mongoose";
import { mongoConnectDB } from "../database/connection.js";
const Schema = mongoose.Schema;
const expenseSchema = new Schema(
  {
    userID: {
      type: Number,
      required: true,
      index: true,
      unique: false,
    },
    isTypeExpense: {
      type: Boolean,
      index: true,
      required: true,
    },
    ofAmount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive Number"],
    },
    isNote: {
      type: String,
      default: "",
    },
    primeCategory: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    onDate: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "default-expense", // <-- this line overrides pluralization of adding "s" at last of collection name
    timestamps: true,
  }
);

const incomeSchema = new Schema(
  {
    userID: {
      type: Number,
      required: true,
      index: true,
      unique: false,
    },
    isTypeExpense: {
      type: Boolean,
      index: true,
      required: true,
    },
    ofAmount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive Number"],
    },
    isNote: {
      type: String,
      default: "",
    },
    primeCategory: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    onDate: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "default-income", // <-- this line overrides pluralization of adding "s" at last of collection name
    timestamps: true,
  }
);

/* //NOTE indexing the valid object this is the correct way for nested object
expenseSchema.index({ "isTransactionTrip.valid": 1 });
expenseSchema.index({ "isTransactionRepeating.valid": 1 }); */

const mainDB = await mongoConnectDB("expense-db");
const expenseModal = mainDB.model("default-expense", expenseSchema);
const incomeModal = mainDB.model("default-income", incomeSchema);
export { expenseModal, incomeModal };
