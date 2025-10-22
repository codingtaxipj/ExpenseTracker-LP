/* REVIEW - validation must check the incoming values
 ** NOTE - after chacking the value it will then pass to controller
 */

import { body, validationResult } from "express-validator";
const budgetValidation = [
  // userID must exist, not empty, and numeric
  body("userID")
    .exists()
    .withMessage("userID is required")
    .notEmpty()
    .withMessage("userID cannot be empty")
    .isNumeric()
    .withMessage("userID must be a number"),

  // year must exist, not empty, numeric, and >= 2000
  body("year")
    .exists()
    .withMessage("year is required")
    .notEmpty()
    .withMessage("year cannot be empty"),

  // budgetList must exist, must be an array, and not empty
  body("budgetList")
    .exists()
    .withMessage("budgetList is required")
    .isArray({ min: 1 })
    .withMessage("budgetList must be a non-empty array"),

  // Validate each item inside budgetList
  body("budgetList.*.month")
    .exists()
    .withMessage("month is required in each budgetList entry")
    .notEmpty()
    .withMessage("month cannot be empty in budgetList entry")
    .isInt({ min: 0, max: 11 })
    .withMessage("month must be between 1 and 12"),

  body("budgetList.*.budget")
    .exists()
    .withMessage("budget is required in each budgetList entry")
    .notEmpty()
    .withMessage("budget cannot be empty in budgetList entry")
    .isInt({ min: 0 })
    .withMessage("budget amount must be a number")
    .custom(value => value >= 0)
    .withMessage("budget amount must be a positive number"),

  // Middleware function to check validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }
    next();
  },
];

export const NewBudget = [
  body("userID")
    .exists()
    .withMessage("userID is required")
    .notEmpty()
    .withMessage("userID cannot be empty")
    .isNumeric()
    .withMessage("userID must be a number"),

  // year must exist, not empty, numeric, and >= 2000
  body("year")
    .exists()
    .withMessage("year is required")
    .notEmpty()
    .withMessage("year cannot be empty"),
  // Validate each item inside budgetList
  body("month")
    .exists()
    .withMessage("month is required in each budget entry")
    .notEmpty()
    .withMessage("month cannot be empty in budget entry")
    .isInt({ min: 0, max: 11 })
    .withMessage("month must be between 1 and 12"),

  body("amount")
    .exists()
    .withMessage("budget amount is required")
    .notEmpty()
    .withMessage("budget amount cannot be empty")
    .isInt({ min: 0 })
    .withMessage("budget amount must be a number")
    .custom(value => value >= 0)
    .withMessage("budget amount must be a positive number"),

  // Middleware function to check validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("New Budget Validation Errors:", errors.array());
      return res.status(400).json({
        message: "New Budget Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

export { budgetValidation };
