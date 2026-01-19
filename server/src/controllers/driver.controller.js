const Driver = require("../models/Driver");

exports.updateLocation = async (req, res) => {
  const { lat, lng } = req.body;

  await Driver.findByIdAndUpdate(req.user.id, {
    location: {
      type: "Point",
      coordinates: [lng, lat],
    },
    isOnline: true,
  });

  res.json({ message: "Location updated" });
};
