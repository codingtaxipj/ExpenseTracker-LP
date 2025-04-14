import mongoose from "mongoose";
import { mongoConnectDB } from "../database/connection.js";
const Schema = mongoose.Schema;
const formSchema = new Schema({
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
});

const mainDB = await mongoConnectDB("main-db");
const formIncomeExpenseModal = mainDB.model("default-user", formSchema);
export { formIncomeExpenseModal };
