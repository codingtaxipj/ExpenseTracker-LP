import express from "express";
import { fetchBudget, setBudget } from "../controllers/budget-controller.js";
import { budgetValidation } from "../middlewares/budget-validation.js";

const budgetRouter = express.Router();

budgetRouter.get("/get-data/:userID", fetchBudget);
budgetRouter.post("/set-budget", budgetValidation, setBudget);

export { budgetRouter };
