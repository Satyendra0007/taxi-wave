const { Queue } = require("bullmq");
const redis = require("../config/redis");

const rideTimeoutQueue = new Queue("ride-timeout", {
  connection: redis,
});

module.exports = rideTimeoutQueue;


