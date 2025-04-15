import { body, validationResult } from "express-validator";
const formIncomeExpenseValidation = [
  body("entryDate")
    .notEmpty()
    .withMessage("entryDate is required")
    .isString()
    .withMessage("entryDate must be a string"),

  body("isFormExpense").notEmpty().isBoolean(),

  body("formTimeStamp")
    .notEmpty()
    .withMessage("formTimeStamp is required")
    .isString()
    .withMessage("formTimeStamp must be a string"),

  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .isNumeric()
    .withMessage("amount must be a number")
    .custom(value => value >= 0)
    .withMessage("amount must be positive"),

  body("title").optional(),
  body("description").optional(),
  body("userCategory").optional(),

  body("primeCategory")
    .notEmpty()
    .withMessage("primeCategory is required")
    .isString()
    .withMessage("primeCategory must be a string"),

  body("subCategory")
    .notEmpty()
    .withMessage("subCategory is required")
    .isString()
    .withMessage("subCategory must be a string"),

  // Middleware function to check validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { formIncomeExpenseValidation };
