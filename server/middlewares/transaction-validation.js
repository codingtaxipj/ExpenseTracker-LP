/* REVIEW - validation must check the incoming values
 ** NOTE - after chacking the value it will then pass to controller
 */

import { body, validationResult } from "express-validator";
const expenseValidation = [
  body("userID")
    .exists()
    .notEmpty()
    .withMessage("User ID Cannot be Empty")
    .isNumeric()
    .withMessage("User ID must be 16 digit number"),
  body("isTransactionExpense")
    .exists()
    .notEmpty()
    .withMessage("Transaction Type Cannot be Empty")
    .isBoolean()
    .withMessage("Transaction Type must be boolen"),
  body("expenseDate")
    .exists()
    .notEmpty()
    .withMessage(" Expense Transaction Date Cannot be Empty")
    .isISO8601()
    .withMessage("Expense Transaction Date must be ISO format string"),
  body("ofAmount")
    .exists()
    .notEmpty()
    .withMessage("Transaction Amount Cannot be Empty")
    .isNumeric()
    .withMessage("Transaction Amount must be number")
    .custom(value => value >= 0)
    .withMessage("Transaction Amount must be positive number"),
  body("isNote")
    .optional()
    .isString()
    .withMessage("Transaction Note Must Be a String"),
  body("primeCategory")
    .exists()
    .notEmpty()
    .withMessage("Primary Category Cannot be Empty")
    .isString()
    .withMessage("Primary Category must be string"),
  body("subCategory")
    .exists()
    .notEmpty()
    .withMessage("Sub Category Cannot be Empty")
    .isString()
    .withMessage("Sub Category must be string"),

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

const incomeValidation = [
  body("userID")
    .exists()
    .notEmpty()
    .withMessage("User ID Cannot be Empty")
    .isNumeric()
    .withMessage("User ID must be 16 digit number"),
  body("isTransactionExpense")
    .exists()
    .notEmpty()
    .withMessage("Transaction Type Cannot be Empty")
    .isBoolean()
    .withMessage("Transaction Type must be boolen"),
  body("incomeDate")
    .exists()
    .notEmpty()
    .withMessage("Income Transaction Date Cannot be Empty")
    .isISO8601()
    .withMessage("Income Transaction Date must be ISO format string"),
  body("ofAmount")
    .exists()
    .notEmpty()
    .withMessage("Transaction Amount Cannot be Empty")
    .isNumeric()
    .withMessage("Transaction Amount must be number")
    .custom(value => value >= 0)
    .withMessage("Transaction Amount must be positive number"),
  body("isNote")
    .optional()
    .isString()
    .withMessage("Transaction Note Must Be a String"),
  body("primeCategory")
    .exists()
    .notEmpty()
    .withMessage("Primary Category Cannot be Empty")
    .isString()
    .withMessage("Primary Category must be string"),
  body("subCategory")
    .exists()
    .notEmpty()
    .withMessage("Sub Category Cannot be Empty")
    .isString()
    .withMessage("Sub Category must be string"),

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

export { expenseValidation, incomeValidation };
