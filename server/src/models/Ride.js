const mongoose = require("mongoose");
const RIDE_STATUS = require("../constants/rideStatus");

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
    },

    pickupLocation: {
      address: String,
      lat: Number,
      lng: Number,
    },

    dropLocation: {
      address: String,
      lat: Number,
      lng: Number,
    },

    distance: Number,
    fare: Number,

    status: {
      type: String,
      enum: Object.values(RIDE_STATUS),
      default: RIDE_STATUS.REQUESTED,
    },

    payment: {
      amount: Number,
      currency: {
        type: String,
        default: "INR",
      },
      status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },
      paymentIntentId: String,
    },

    invoice: {
      baseFare: Number, 
      distanceFare: Number,
      timeFare: Number,
      cancellationFee: {
        type: Number,
        default: 0,
      },
      totalAmount: Number,
    },


  },
  { timestamps: true }
);

/* 🔥 INDEXES (IMPORTANT) */
rideSchema.index({ status: 1 });
rideSchema.index({ user: 1 });
rideSchema.index({ driver: 1 });

module.exports = mongoose.model("Ride", rideSchema);
