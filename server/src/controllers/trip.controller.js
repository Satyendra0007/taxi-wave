const Ride = require("../models/Ride");
const RIDE_STATUS = require("../constants/rideStatus");

exports.getUserTrips = async (req, res) => {
  const trips = await Ride.find({
    user: req.user.id,
    status: { $in: [RIDE_STATUS.COMPLETED, RIDE_STATUS.CANCELLED] },
  })
    .sort({ createdAt: -1 })
    .populate("driver", "name phone");

  res.json(trips);
};

exports.getDriverTrips = async (req, res) => {
  const trips = await Ride.find({
    driver: req.user.id,
    status: { $in: [RIDE_STATUS.COMPLETED, RIDE_STATUS.CANCELLED] },
  })
    .sort({ createdAt: -1 })
    .populate("user", "name phone");

  res.json(trips);
};
