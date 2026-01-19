const { body, param } = require("express-validator");

exports.requestRideValidator = [
  body("pickupLocation.address").notEmpty(),
  body("pickupLocation.lat").isFloat(),
  body("pickupLocation.lng").isFloat(),

  body("dropLocation.address").notEmpty(),
  body("dropLocation.lat").isFloat(),
  body("dropLocation.lng").isFloat(),

  body("distance").isFloat({ min: 0 }),
  body("fare").isFloat({ min: 0 }),
];

exports.acceptRideValidator = [
  param("rideId").isMongoId().withMessage("Invalid ride ID"),
];

exports.rideIdValidator = [
  param("rideId").isMongoId().withMessage("Invalid ride ID"),
];

