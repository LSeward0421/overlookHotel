class Room {
  constructor(roomData) {
    this.number = roomData.number;
    this.roomType = roomData.roomType;
    this.bidet = roomData.bidet;
    this.bedSize = roomData.bedSize;
    this.numBeds = roomData.numBeds;
    this.costPerNight = roomData.costPerNight;
    this.isBooked = false;
  }
  getBooked() {
    if (!this.booked === true) {
      this.isBooked = true;
    }
  }
};

export default Room;
