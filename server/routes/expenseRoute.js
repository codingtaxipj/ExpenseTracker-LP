import express from "express";
import { transactionFormValidation } from "../middlewares/transaction-validation.js";

import {
  insertTransaction,
  fetchAllData,
} from "../controllers/transaction-controller.js";

const expenseRouter = express.Router();

expenseRouter.post("/add-data", transactionFormValidation, insertTransaction);

expenseRouter.get("/get-data", fetchAllData);

export { expenseRouter };
