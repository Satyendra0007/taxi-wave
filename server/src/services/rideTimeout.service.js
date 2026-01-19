const rideTimeoutQueue = require("../queues/rideTimeout.queue");

class RideTimeoutService {
  async start(rideId) {
    console.log("⏱ Adding timeout job for ride:", rideId);

    await rideTimeoutQueue.add(
      "cancel-unaccepted-ride",
      { rideId },
      { delay: 30000 }
    );
  }
}

module.exports = new RideTimeoutService();


