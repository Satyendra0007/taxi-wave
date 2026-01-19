const mongoose = require("mongoose");

const earningSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    ride: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    platformFee: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Earning", earningSchema);
