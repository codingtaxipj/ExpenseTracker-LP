import express from "express";
import {
  fetchBudget,
  insertBudget,
  updateBudget,
} from "../controllers/budget-controller.js";
import { budgetValidation } from "../middlewares/budget-validation.js";

const budgetRouter = express.Router();

budgetRouter.get("/get-data/:userID", fetchBudget);
budgetRouter.post("/add-data", budgetValidation, insertBudget);
budgetRouter.patch("/update-budget", budgetValidation, updateBudget);

export { budgetRouter };
