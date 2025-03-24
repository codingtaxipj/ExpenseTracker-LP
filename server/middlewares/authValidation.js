import { body, validationResult } from "express-validator";

// Middleware for validating user input
const validateUser = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("userName")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 6 })
    .withMessage("Username must be at least 3 characters"),
  body("userEmail").isEmail().withMessage("Invalid email format"),
  body("userPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  // Middleware function to check validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body("userEmail").isEmail().withMessage("Invalid email format"),
  body("userPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  // Middleware function to check validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateUser, validateLogin };
