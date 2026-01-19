const { body } = require("express-validator");

/* USER REGISTER */
exports.userRegisterValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("phone").isLength({ min: 10 }).withMessage("Valid phone required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

/* USER LOGIN */
exports.userLoginValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required"),
];

/* DRIVER REGISTER */
exports.driverRegisterValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("phone").isLength({ min: 10 }).withMessage("Valid phone required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("vehicle.type")
    .notEmpty()
    .withMessage("Vehicle type is required"),
  body("vehicle.number")
    .notEmpty()
    .withMessage("Vehicle number is required"),
];

/* DRIVER LOGIN */
exports.driverLoginValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required"),
];
