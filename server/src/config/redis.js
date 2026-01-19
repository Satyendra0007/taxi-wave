const IORedis = require("ioredis");

const redis = new IORedis({
  host: "127.0.0.1",
  port: 6379,

  // 🔥 REQUIRED FOR BULLMQ
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis error", err);
});

module.exports = redis;
