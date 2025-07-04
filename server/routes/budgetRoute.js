import express from "express";
import { fetchBudget, insertBudget } from "../controllers/budget-controller.js";
import { budgetValidation } from "../middlewares/budget-validation.js";

const budgetRouter = express.Router();

budgetRouter.get("/get-data/:userID", fetchBudget);
budgetRouter.post("/add-data", budgetValidation, insertBudget);

export { budgetRouter };
