const Driver = require("../models/Driver");

class RideMatchingService {
  async findNearestDrivers({ lat, lng, maxDistance = 5000, limit = 5 }) {
    return Driver.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng, lat],
          },
          distanceField: "distance",
          maxDistance,
          spherical: true,
          query: { isOnline: true },
        },
      },
      { $limit: limit },
    ]);
  }
}

module.exports = new RideMatchingService();
