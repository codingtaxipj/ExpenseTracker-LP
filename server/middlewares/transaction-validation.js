/* REVIEW - validation must check the incoming values
 ** NOTE - after chacking the value it will then pass to controller
 */

import { body, validationResult } from "express-validator";
const transactionFormValidation = [
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
  body("isTransactionTrip")
    .exists()
    .notEmpty()
    .withMessage("Trip Transaction cannot be empty")
    .isObject()
    .withMessage("Trip Transaction must be an object"),
  body("isTransactionTrip.valid")
    .exists()
    .withMessage("valid inside isTransactionTrip is required")
    .isBoolean()
    .withMessage("value must be a boolean"),
  body("isTransactionRepeating")
    .exists()
    .notEmpty()
    .withMessage("Recurring Transaction cannot be empty")
    .isObject()
    .withMessage("Recurring Transaction must be an object"),
  body("isTransactionRepeating.valid")
    .exists()
    .withMessage("valid inside isTransactionRepeating is required")
    .isBoolean()
    .withMessage("value must be a boolean"),
  body("onDate")
    .exists()
    .notEmpty()
    .withMessage("Transaction Date Cannot be Empty")
    .isISO8601()
    
    .withMessage("onDate must be ISO format string"),
  body("ofAmount")
    .exists()
    .notEmpty()
    .withMessage("Transaction Amount Cannot be Empty")
    .isNumeric()
    .withMessage("Transaction Amount must be number")
    .custom(value => value >= 0)
    .withMessage("Transaction Amount must be positive number"),
  body("isExpenseNote").optional().isString().withMessage("Must Be a String"),
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
  body("transactionTimestamp")
    .exists()
    .notEmpty()
    .withMessage("timestamp cannot be empty")
    .isISO8601()
    .withMessage("timestamp must be ISO format string"),

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

export { transactionFormValidation };
