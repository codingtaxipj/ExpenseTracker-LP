import express from "express";
import {
  expenseValidation,
  incomeValidation,
  recurringValidation,
} from "../middlewares/transaction-validation.js";

import {
  deleteExpense,
  deleteIncome,
  fetchExpense,
  fetchIncome,
  fetchRecurringExpense,
  insertExpense,
  insertIncome,
  insertRecurringExpense,
} from "../controllers/transaction-controller.js";

const transactionRouter = express.Router();

//* ====================== INSERT API ======================
transactionRouter.post("/add-expense", expenseValidation, insertExpense);
transactionRouter.post("/add-income", incomeValidation, insertIncome);
transactionRouter.post(
  "/add-recurring-expense",
  recurringValidation,
  insertRecurringExpense
);

//* ====================== DELETE API ======================
transactionRouter.delete("/delete-expense/:userID/:expID", deleteExpense);
transactionRouter.delete("/delete-income/:userID/:incID", deleteIncome);

//* ====================== FETCH API ======================
transactionRouter.get("/get-expense/:userID", fetchExpense);
transactionRouter.get("/get-recurring-expense/:userID", fetchRecurringExpense);
transactionRouter.get("/get-income/:userID", fetchIncome);

export { transactionRouter };
