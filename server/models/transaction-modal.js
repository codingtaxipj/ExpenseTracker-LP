/* REVIEW - modal is the database design to store value
 ** NOTE - it will be used inside controller when injecting the data in DB
 */

import mongoose from "mongoose";
import { mongoConnectDB } from "../database/connection.js";
const Schema = mongoose.Schema;
const transactionSchema = new Schema(
  {
    userID: {
      type: Number,
      required: true,
      index: true,
      unique: false,
    },
    isTransactionExpense: {
      type: Boolean,
      index: true,
      required: true,
    },
    isTransactionTrip: {
      type: {
        valid: {
          type: Boolean,
          required: true,
        },
        by: {
          type: String,
        },
      },
    },

    isTransactionRepeating: {
      type: new mongoose.Schema(
        {
          valid: { type: Boolean, required: true },
          by: { type: String },
        },
        { _id: false } // disable auto _id on nested object
      ),
      required: true,
    },

    ofAmount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive Number"],
    },
    isExpenseNote: {
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
    transactionTimestamp: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "default-user", // <-- this line overrides pluralization of adding "s" at last of collection name
    timestamps: true,
  }
);

//NOTE indexing the valid object this is the correct way for nested object
transactionSchema.index({ "isTransactionTrip.valid": 1 });
transactionSchema.index({ "isTransactionRepeating.valid": 1 });

const mainDB = await mongoConnectDB("expense-db");
const transactionModal = mainDB.model("default-user", transactionSchema);
export { transactionModal };
