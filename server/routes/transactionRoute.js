import express from "express";
import {
  expenseValidation,
  incomeValidation,
  recurringValidation,
} from "../middlewares/transaction-validation.js";

import {
  fetchExpense,
  fetchIncome,
  fetchRecurringExpense,
  insertExpense,
  insertIncome,
  insertRecurringExpense,
} from "../controllers/transaction-controller.js";
import { insertTotal } from "../controllers/total-controller.js";
import { insertMinMax } from "../controllers/minmax-controller.js";

const transactionRouter = express.Router();

transactionRouter.post(
  "/add-expense",
  expenseValidation,
  insertExpense,
  insertTotal,
  insertMinMax
);

transactionRouter.post(
  "/add-recurring-expense",
  recurringValidation,
  insertRecurringExpense
);

transactionRouter.post(
  "/add-income",
  incomeValidation,
  insertIncome,
  insertTotal,
  insertMinMax
);

transactionRouter.get("/get-expense/:userID", fetchExpense);
transactionRouter.get("/get-recurring-expense/:userID", fetchRecurringExpense);
transactionRouter.get("/get-income/:userID", fetchIncome);

export { transactionRouter };
