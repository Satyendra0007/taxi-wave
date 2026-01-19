const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const driverController = require("../controllers/driver.controller");

router.patch(
  "/location",
  auth,
  role("driver"),
  driverController.updateLocation
);

module.exports = router;
