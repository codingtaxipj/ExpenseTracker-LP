import mongoose from "mongoose";
import { mongoConnectDB } from "../database/connection.js";
const Schema = mongoose.Schema;
const formSchema = new Schema(
  {
    isFormExpense: {
      type: Boolean,
      required: true,
    },
    entryDate: {
      type: String,
      required: true,
    },
    formTimeStamp: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // Enforce positive values
    },
    title: {
      type: String,
      required: false, // Optional field
    },
    description: {
      type: String,
      required: false, // Optional field
    },
    primeCategory: {
      type: String,
      required: true, // Enforce selection of a main category
    },
    subCategory: {
      type: String,
      required: true, // Subcategory is mandatory
    },
    userCategory: {
      type: String,
      required: false, // Optional 3rd category
    },
  },
  {
    collection: "default-user", // <-- this line overrides pluralization of adding "s" at last of collection name
  }
);

const mainDB = await mongoConnectDB("expense-db");
const formIncomeExpenseModal = mainDB.model("default-user", formSchema);
export { formIncomeExpenseModal };
