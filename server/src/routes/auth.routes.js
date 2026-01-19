const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validateRequest = require("../middleware/validateRequest");
const {
  userRegisterValidator,
  userLoginValidator,
  driverRegisterValidator,
  driverLoginValidator,
} = require("../validators/auth.validator");

router.post(
  "/user/register",
  userRegisterValidator,
  validateRequest,
  authController.userRegister
);

router.post(
  "/user/login",
  userLoginValidator,
  validateRequest,
  authController.userLogin
);

router.post(
  "/driver/register",
  driverRegisterValidator,
  validateRequest,
  authController.driverRegister
);

router.post(
  "/driver/login",
  driverLoginValidator,
  validateRequest,
  authController.driverLogin
);

module.exports = router;
