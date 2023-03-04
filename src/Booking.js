class Booking {
  constructor(bookingData) {
    this.id = bookingData.id;
    this.userId = bookingData.userID;
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
  }
};

export default Booking;
