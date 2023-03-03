class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
    this.totalSpent = 0;
    this.selectedRoom = null;
  }
  selectRoom(room) {
    this.selectedRoom = room;
  }
  
  bookRoom(room) {
    if (!this.bookings.includes(room)) {
      this.bookings.push(room);
    } 
    this.calculateTotalSpent();
  }

  myBookings(bookingData) {
    this.bookings = bookingData.filter(booking => booking.userID === this.id);
  }

  findAvailableRooms(allBookings, allRooms, date, roomType) {
    const bookedRoomNumbers = allBookings
      .filter(booking => booking.date === date)
      .map(booking => booking.roomNumber);
    const availableRooms = allRooms.filter(room => !bookedRoomNumbers.includes(room.number) && room.roomType === roomType);
    return availableRooms;
  }
  
  calculateTotalSpent() {
    this.totalSpent = this.bookings.reduce((total, room) => {
      return total + room.costPerNight;
    }, 0);
  }
}

export default Customer;
