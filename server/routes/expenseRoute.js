import express from "express";
import { transactionFormValidation } from "../middlewares/transaction-validation.js";

import {
  insertTransaction,
  fetchAllData,
} from "../controllers/transaction-controller.js";
import { insertTotal } from "../controllers/total-controller.js";

const expenseRouter = express.Router();

expenseRouter.post(
  "/add-data",
  transactionFormValidation,
  insertTransaction,
  insertTotal
);

expenseRouter.get("/get-data", fetchAllData);

export { expenseRouter };
