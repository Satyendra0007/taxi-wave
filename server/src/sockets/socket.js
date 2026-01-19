const { Server } = require("socket.io");
const driverPresence = require("../services/driverPresence.service");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Connected:", socket.id);

    socket.on("driver:online", ({ driverId }) => {
      driverPresence.setOnline(driverId, socket.id);
    });

    socket.on("driver:location", ({ driverId, lat, lng }) => {
      driverPresence.setLocation(driverId, { lat, lng });
    });

    socket.on("driver:offline", ({ driverId }) => {
      driverPresence.remove(driverId);
    });

    socket.on("disconnect", () => {
      for (const [driverId, data] of driverPresence.getAll()) {
        if (data.socketId === socket.id) {
          driverPresence.remove(driverId);
        }
      }
    });
  });
};

const getIO = () => io;

module.exports = { initSocket, getIO };
