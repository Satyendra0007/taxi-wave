const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const rideRoutes = require("./routes/ride.routes");
const driverRoutes = require("./routes/driver.routes")
const paymentRoutes = require("./routes/payment.routes")
const tripRoutes = require("./routes/trip.routes")

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/trips", tripRoutes);




// Test route
app.get("/", (req, res) => {
  res.send("Uber backend running 🚕");
});

module.exports = app;
