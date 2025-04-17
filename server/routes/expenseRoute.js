import express from "express";
import { expenseFormValidation } from "../middlewares/expense-formValidation.js";
import {
  updatePrimeMax,
  updateSubMax,
} from "../middlewares/update-Max-Expense.js";
import {
  formController,
  fetchExpenseData,
  fetchIncomeData,
  fetchMaxExpensePrime,
  fetchMaxIncomePrime,
} from "../controllers/expense-DataController.js";

const expenseRouter = express.Router();
expenseRouter.post(
  "/add-data",
  expenseFormValidation,
  formController,
  updateSubMax,
  updatePrimeMax
);

expenseRouter.get("/get-expesne-data", fetchExpenseData);
expenseRouter.get("/get-expense-prime-max", fetchMaxExpensePrime);

expenseRouter.get("/get-income-data", fetchIncomeData);
expenseRouter.get("/get-income-prime-max", fetchMaxIncomePrime);

export { expenseRouter };
