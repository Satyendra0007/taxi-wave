const Ride = require("../models/Ride");
const PaymentService = require("../services/payment.service");
const RIDE_STATUS = require("../constants/rideStatus");
const Earning = require("../models/Earning");

exports.createPayment = async (req, res) => {
  const { rideId } = req.params;

  const ride = await Ride.findOne({
    _id: rideId,
    status: RIDE_STATUS.COMPLETED,
  });

  if (!ride) {
    return res.status(400).json({
      message: "Ride not eligible for payment",
    });
  }

  const paymentIntent = await PaymentService.createPaymentIntent({
    amount: ride.fare,
    currency: "INR",
  });

  ride.payment = {
    amount: ride.fare,
    currency: "INR",
    status: "pending",
    paymentIntentId: paymentIntent.id,
  };

  await ride.save();

  res.json({
    message: "Payment initiated",
    paymentIntent,
  });
};


exports.confirmPayment = async (req, res) => {
  const { paymentIntentId } = req.body;

  const ride = await Ride.findOne({
    "payment.paymentIntentId": paymentIntentId,
    "payment.status": "pending",
  });

  if (!ride) {
    return res.status(404).json({ message: "Payment not found" });
  }

  // mark ride paid
  ride.payment.status = "paid";
  await ride.save();

  // calculate driver earning
  const platformFeePercent = 0.2; // 20%
  const platformFee = ride.fare * platformFeePercent;
  const driverAmount = ride.fare - platformFee;

  await Earning.create({
    driver: ride.driver,
    ride: ride._id,
    amount: driverAmount,
    platformFee,
  });

  res.json({
    message: "Payment successful",
    driverAmount,
  });
};
