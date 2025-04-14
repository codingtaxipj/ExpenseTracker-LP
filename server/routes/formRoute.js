import express from "express";
import { formIncomeExpenseValidation } from "../middlewares/income-expense-formValidation.js";
import { formController } from "../controllers/income-expense-formController.js";
const formRouter = express.Router();
formRouter.post("/add-data", formIncomeExpenseValidation, formController);

export { formRouter };
