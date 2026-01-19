const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    vehicle: {
      type: {
        type: String, // car, bike, auto
        required: true,
      },
      number: {
        type: String,
        required: true,
      },
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
        index: "2dsphere",
      },
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["driver"],
      default: "driver",
    },
  },
  { timestamps: true }
);

// 🔐 Hash password
driverSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


// 🔑 Compare password
driverSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Driver", driverSchema);
