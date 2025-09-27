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
    .isNumeric()
    .withMessage("budget must be a number"),

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

export { budgetValidation };
