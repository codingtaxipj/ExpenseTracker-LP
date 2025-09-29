/* REVIEW - validation must check the incoming values
 ** NOTE - after chacking the value it will then pass to controller
 */

import { body, validationResult } from "express-validator";
const totalValidation = [
  body("userID").isInt().withMessage("userID must be an integer"),
  body("year").isInt().withMessage("Enter a valid year"),
  body("isTypeExpense")
    .notEmpty()
    .withMessage("isTypeExpense Type Cannot be Empty")
    .isBoolean()
    .withMessage("isTypeExpense Type must be boolen"),
  body("total").isNumeric().withMessage("Total must be a number"),

  // Validate monthList array
  body("monthList").isArray().withMessage("monthList must be an array"),
  body("monthList.*.month")
    .isInt({ min: 0, max: 11 })
    .withMessage("monthList.month must be between 0 and 11"),
  body("monthList.*.total")
    .isNumeric()
    .withMessage("monthList.total must be a number"),

  // Validate primeList array
  body("primeList").isArray().withMessage("primeList must be an array"),
  body("primeList.*.name")
    .isString()
    .notEmpty()
    .withMessage("primeList.name is required"),
  body("primeList.*.total")
    .isNumeric()
    .withMessage("primeList.total must be a number"),

  // Validate subList array
  body("subList").isArray().withMessage("subList must be an array"),
  body("subList.*.primeName")
    .isString()
    .notEmpty()
    .withMessage("subList.primeName is required"),
  body("subList.*.subName")
    .isString()
    .notEmpty()
    .withMessage("subList.subName is required"),
  body("subList.*.total")
    .isNumeric()
    .withMessage("subList.total must be a number"),

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

export { totalValidation };
