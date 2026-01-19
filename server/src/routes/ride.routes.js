const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const validateRequest = require("../middleware/validateRequest");

const rideController = require("../controllers/ride.controller");
const {
  requestRideValidator,
  acceptRideValidator,
  rideIdValidator,
} = require("../validators/ride.validator");

// USER → Request ride
router.post(
  "/request",
  auth,
  role("user"),
  requestRideValidator,
  validateRequest,
  rideController.requestRide
);

// DRIVER → Accept ride
router.patch(
  "/accept/:rideId",
  auth,
  role("driver"),
  acceptRideValidator,
  validateRequest,
  rideController.acceptRide
);

// DRIVER → start ride
router.patch(
  "/start/:rideId",
  auth,
  role("driver"),
  rideIdValidator,
  validateRequest,
  rideController.startRide
);

// DRIVER → complete ride
router.patch(
  "/complete/:rideId",
  auth,
  role("driver"),
  rideIdValidator,
  validateRequest,
  rideController.completeRide
);

// USER / DRIVER → cancel ride
router.patch(
  "/cancel/:rideId",
  auth,
  rideIdValidator,
  validateRequest,
  rideController.cancelRide
);


module.exports = router;
