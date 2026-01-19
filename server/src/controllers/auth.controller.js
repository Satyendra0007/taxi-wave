const User = require("../models/User");
const Driver = require("../models/Driver");
const generateToken = require("../utils/generateToken");
const { matchedData } = require("express-validator");


/* ================= USER REGISTER ================= */
exports.userRegister = async (req, res) => {
  try {
    const { name, email, phone, password } = matchedData(req);

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, phone, password });

    const token = generateToken({ id: user._id, role: "user" });

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= USER LOGIN ================= */
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = matchedData(req);;

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user._id, role: "user" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DRIVER REGISTER ================= */
exports.driverRegister = async (req, res) => {
  try {
    const { name, email, phone, password, vehicle } = matchedData(req);;

    const existingDriver = await Driver.findOne({ email });
    if (existingDriver)
      return res.status(400).json({ message: "Driver already exists" });

    const driver = await Driver.create({
      name,
      email,
      phone,
      password,
      vehicle,
    });

    const token = generateToken({ id: driver._id, role: "driver" });

    res.status(201).json({
      message: "Driver registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DRIVER LOGIN ================= */
exports.driverLogin = async (req, res) => {
  try {
    const { email, password } = matchedData(req);;

    const driver = await Driver.findOne({ email }).select("+password");
    if (!driver)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await driver.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: driver._id, role: "driver" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
