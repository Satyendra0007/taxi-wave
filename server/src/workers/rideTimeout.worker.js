require("dotenv").config();
const { Worker } = require("bullmq");
const redis = require("../config/redis");
const connectDB = require("../config/db"); // 🔥 ADD THIS
const Ride = require("../models/Ride");
const RIDE_STATUS = require("../constants/rideStatus");

// 🔥 CONNECT TO MONGODB (CRITICAL)
connectDB();

new Worker(
  "ride-timeout",
  async (job) => {
    console.log("🛠 Processing job:", job.name, job.data);

    const { rideId } = job.data;

    const ride = await Ride.findOne({
      _id: rideId,
      status: RIDE_STATUS.REQUESTED,
    });

    if (ride) {
      ride.status = RIDE_STATUS.CANCELLED;
      await ride.save();
      console.log("⏱ Ride auto-cancelled:", rideId);
    } else {
      console.log("ℹ Ride already accepted or not found:", rideId);
    }
  },
  { connection: redis }
);
