class DriverPresenceService {
  constructor() {
    this.drivers = new Map();
  }

  setOnline(driverId, socketId) {
    this.drivers.set(driverId, {
      socketId,
      location: null,
    });
  }

  setLocation(driverId, location) {
    if (!this.drivers.has(driverId)) return;
    this.drivers.get(driverId).location = location;
  }

  remove(driverId) {
    this.drivers.delete(driverId);
  }

  getAll() {
    return this.drivers;
  }

  get(driverId) {
    return this.drivers.get(driverId);
  }
}

module.exports = new DriverPresenceService();
