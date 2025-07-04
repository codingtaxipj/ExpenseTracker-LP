/* REVIEW - validation must check the incoming values
 ** NOTE - after chacking the value it will then pass to controller
 */

import { body, validationResult } from "express-validator";
const budgetValidation = [
  body("userID")
    .exists()
    .notEmpty()
    .withMessage("userID Cannot be Empty")
    .isNumeric()
    .withMessage("userID must be 16 digit number"),
  body("budgetAmount")
    .exists()
    .notEmpty()
    .withMessage("budgetAmount cannot be empty")
    .isNumeric()
    .withMessage("budgetAmount must be a Nmmber")
    .custom(value => value >= 0)
    .withMessage("budgetAmount must be a Positive Nmmber"),
  body("activeFrom")
    .exists()
    .notEmpty()
    .withMessage("activeFrom cannot be empty")
    .isISO8601()
    .withMessage("activeFrom must be a ISO Date"),

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
