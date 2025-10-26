import express from "express";
import {
  deleteBudget,
  fetchBudget,
  setBudget,
} from "../controllers/budget-controller.js";
import { NewBudget } from "../middlewares/budget-validation.js";

const budgetRouter = express.Router();

budgetRouter.get("/get-data/:userID", fetchBudget);
budgetRouter.post("/set-budget", NewBudget, setBudget);
budgetRouter.post("/delete-budget", NewBudget, deleteBudget);

export { budgetRouter };
