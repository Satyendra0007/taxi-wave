const Ride = require("../models/Ride");
const { matchedData } = require("express-validator");
const { getIO } = require("../sockets/socket");
const RIDE_STATUS = require("../constants/rideStatus");
const rideMatchingService = require("../services/rideMatching.service");
const driverPresence = require("../services/driverPresence.service");
const rideTimeoutService = require("../services/rideTimeout.service")

/* ================= USER REQUEST RIDE ================= */
exports.requestRide = async (req, res) => {
  try {
    const data = matchedData(req);

    const ride = await Ride.create({
      user: req.user.id,
      pickupLocation: data.pickupLocation,
      dropLocation: data.dropLocation,
      distance: data.distance,
      fare: data.fare,
      status: RIDE_STATUS.REQUESTED,
    });

    // 🔥 FIND NEAREST DRIVERS
    const drivers = await rideMatchingService.findNearestDrivers({
      lat: data.pickupLocation.lat,
      lng: data.pickupLocation.lng,
    });

    const io = getIO();

    // 🔔 Notify top drivers only
    drivers.forEach((driver) => {
      const presence = driverPresence.get(driver._id.toString());
      if (presence) {
        io.to(presence.socketId).emit("ride:request", ride);
      }
    });

    rideTimeoutService.start(ride._id);

    return res.status(201).json({
      message: "Ride requested",
      ride,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.acceptRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    const ride = await Ride.findOneAndUpdate(
      {
        _id: rideId,
        status: RIDE_STATUS.REQUESTED,
      },
      {
        status: RIDE_STATUS.ACCEPTED,
        driver: req.user.id,
      },
      { new: true }
    );

    if (!ride) {
      return res.status(400).json({
        message: "Ride already taken or unavailable",
      });
    }

    const io = getIO();
    io.emit(`ride:${ride.user}`, {
      status: RIDE_STATUS.ACCEPTED,
      ride,
    });

    return res.json({
      message: "Ride accepted",
      ride,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.startRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    const ride = await Ride.findOneAndUpdate(
      {
        _id: rideId,
        driver: req.user.id,
        status: RIDE_STATUS.ACCEPTED,
      },
      { status: RIDE_STATUS.STARTED },
      { new: true }
    );

    if (!ride) {
      return res.status(400).json({
        message: "Ride cannot be started",
      });
    }

    const io = getIO();
    io.emit(`ride:${ride.user}`, {
      status: RIDE_STATUS.STARTED,
      ride,
    });

    return res.json({
      message: "Ride started",
      ride,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.completeRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    const ride = await Ride.findOneAndUpdate(
      {
        _id: rideId,
        driver: req.user.id,
        status: RIDE_STATUS.STARTED,
      },
      { status: RIDE_STATUS.COMPLETED },
      { new: true }
    );

    if (!ride) {
      return res.status(400).json({
        message: "Ride cannot be completed",
      });
    }

    const io = getIO();
    io.emit(`ride:${ride.user}`, {
      status: RIDE_STATUS.COMPLETED,
      ride,
    });

    return res.json({
      message: "Ride completed",
      ride,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.cancelRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    const conditions = {
      _id: rideId,
      status: { $in: [RIDE_STATUS.REQUESTED, RIDE_STATUS.ACCEPTED] },
    };

    if (req.user.role === "user") {
      conditions.user = req.user.id;
    }

    if (req.user.role === "driver") {
      conditions.driver = req.user.id;
    }

    const ride = await Ride.findOneAndUpdate(
      conditions,
      { status: RIDE_STATUS.CANCELLED },
      { new: true }
    );

    if (!ride) {
      return res.status(400).json({
        message: "Ride cannot be cancelled",
      });
    }

    const io = getIO();
    io.emit(`ride:${ride.user}`, {
      status: RIDE_STATUS.CANCELLED,
      ride,
    });

    return res.json({
      message: "Ride cancelled",
      ride,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
