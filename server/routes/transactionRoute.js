import express from "express";
import {
  expenseValidation,
  incomeValidation,
  recurringValidation,
} from "../middlewares/transaction-validation.js";

import {
  deleteExpense,
  deleteIncome,
  deleteRecurringExpense,
  fetchExpense,
  fetchIncome,
  fetchRecurringExpense,
  insertExpense,
  insertIncome,
  insertRecurringExpense,
  updateExpense,
  updateIncome,
  updateRecurringExpense,
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

//* ====================== UPADTE API ======================

transactionRouter.post("/update-expense", expenseValidation, updateExpense);
transactionRouter.post("/update-income", incomeValidation, updateIncome);
transactionRouter.post(
  "/update-recurring-expense",
  recurringValidation,
  updateRecurringExpense
);

//* ====================== DELETE API ======================
transactionRouter.delete("/delete-expense/:userID/:expID", deleteExpense);
transactionRouter.delete(
  "/delete-recurring-expense/:userID/:recExpID",
  deleteRecurringExpense
);
transactionRouter.delete("/delete-income/:userID/:incID", deleteIncome);

//* ====================== FETCH API ======================
transactionRouter.get("/get-expense/:userID", fetchExpense);
transactionRouter.get("/get-recurring-expense/:userID", fetchRecurringExpense);
transactionRouter.get("/get-income/:userID", fetchIncome);

export { transactionRouter };
