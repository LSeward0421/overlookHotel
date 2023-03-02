class Booking {
  constructor(bookingData) {
    this.id = bookingData.id;
    this.userId = bookingData.userID;
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
  }

  getBookingDetails(roomsData) {
    const room = roomsData.find((room) => room.number === this.roomNumber);

    if (room) {
      return {
        date: this.date,
        roomNumber: this.roomNumber,
        roomType: room.roomType,
        price: this.calculateBookingPrice(),
      };
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
