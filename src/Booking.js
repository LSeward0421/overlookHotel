class Booking {
  constructor(id, userId, date, roomNumber, roomsData) {
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.roomNumber = roomNumber;
    this.roomsData = roomsData;
  }

  getBookingDetails() {
    const room = this.roomsData.find((room) => room.number === this.roomNumber);
    if (room) {
      const booking = {
        date: this.date,
        roomNumber: this.roomNumber,
        roomType: room.roomType,
        price: this.calculateBookingPrice(),
      };
      return booking;
    } else {
      return null;
    }
  }

  calculateBookingPrice() {
    const room = this.roomsData.find((room) => room.number === this.roomNumber);
    const price = room.costPerNight;
    return price;
  }

  cancelBooking() {
    this.id = null;
    this.userId = null;
    this.date = null;
    this.roomNumber = null;
  }
}

export default Booking;
