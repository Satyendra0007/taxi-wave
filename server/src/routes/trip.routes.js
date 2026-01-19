const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const tripController = require("../controllers/trip.controller");

router.get("/user", auth, role("user"), tripController.getUserTrips);
router.get("/driver", auth, role("driver"), tripController.getDriverTrips);

module.exports = router;
