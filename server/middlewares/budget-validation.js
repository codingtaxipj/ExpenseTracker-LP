/* REVIEW - validation must check the incoming values
 ** NOTE - after chacking the value it will then pass to controller
 */

import { body, validationResult } from "express-validator";
const budgetValidation = [
  body("userID")
    .exists()
    .notEmpty()
    .withMessage("userID Cannot be Empty")
    .isInt()
    .withMessage("userID must be 16 digit Integer"),
  body("year")
    .exists()
    .notEmpty()
    .withMessage("year cannot be empty")
    .isInt()
    .withMessage("year must be a Year Number")
    .custom(value => value >= 0)
    .withMessage("year must be a Positive Nmmber"),
  body("month")
    .exists()
    .notEmpty()
    .withMessage("month cannot be empty")
    .isInt()
    .withMessage("month must be a Year Number")
    .custom(value => value >= 0)
    .withMessage("month must be a Positive Nmmber"),
  body("amount")
    .exists()
    .notEmpty()
    .withMessage("amount cannot be empty")
    .isInt()
    .custom(value => value >= 0)
    .withMessage("amount must be a Positive Nmmber"),

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
