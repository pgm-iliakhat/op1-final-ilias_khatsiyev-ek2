import { body } from "express-validator";

export default [
  body("lastname").notEmpty().withMessage("Last name is a required field."),
  body("firstname").notEmpty().withMessage("First name is a required field."),
  body("email")
    .notEmpty()
    .withMessage("Email is a required field.")
    .bail()
    .isEmail()
    .withMessage("Invalid email address."),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long."),
];
