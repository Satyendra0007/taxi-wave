const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const paymentController = require("../controllers/payment.controller");

router.post(
  "/create/:rideId",
  auth,
  role("user"),
  paymentController.createPayment
);

router.post("/confirm", paymentController.confirmPayment);

module.exports = router;
