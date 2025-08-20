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
      default: null,
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
      default: null,
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

const recurringExpSchema = new Schema(
  {
    userID: {
      type: Number,
      required: true,
      index: true,
      unique: false,
    },
    isTypeExpense: {
      type: Boolean,
      required: true,
    },
    isRepeatBy: {
      type: Number,
      index: true,
      required: true,
      enum: {
        values: [1, 2],
        message: "repeatBy must be either 1 or 2",
      },
    },
    isRepeatStatus: {
      type: Number,
      index: true,
      required: true,
      enum: {
        values: [0, 1, 2, 3, 4],
        message: "Repeat Status must be btwn 0,1,2,3 or 4",
      },
    },
    ofAmount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive Number"],
    },
    isNote: {
      type: String,
      default: null,
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
    lastPaymentDate: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "default-recurring", // <-- this line overrides pluralization of adding "s" at last of collection name
    timestamps: true,
  
  }
);

/* //NOTE indexing the valid object this is the correct way for nested object
expenseSchema.index({ "isTransactionTrip.valid": 1 });
expenseSchema.index({ "isTransactionRepeating.valid": 1 }); */

const mainDB = await mongoConnectDB("expense-db");
const expenseModal = mainDB.model("default-expense", expenseSchema);
const recurringExpModal = mainDB.model("default-recurring", recurringExpSchema);
const incomeModal = mainDB.model("default-income", incomeSchema);
export { expenseModal, recurringExpModal, incomeModal };
