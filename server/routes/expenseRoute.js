import express from "express";
import { expenseFormValidation } from "../middlewares/expense-formValidation.js";
import {
  updatePrimeMax,
  updateSubMax,
} from "../middlewares/update-Max-Expense.js";
import {
  formController,
  fetchAllData,
  fetchMaxData,
} from "../controllers/expense-DataController.js";

const expenseRouter = express.Router();
expenseRouter.post(
  "/add-data",
  expenseFormValidation,
  formController,
  updateSubMax,
  updatePrimeMax
);

expenseRouter.get("/get-data", fetchAllData);
expenseRouter.get("/get-max-data", fetchMaxData);

export { expenseRouter };
