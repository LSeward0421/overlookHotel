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
    return this.bookings
  }

  myBookings(bookingData) {
    return this.bookings = bookingData.filter(booking => booking.userId === this.id);
  }

  findAvailableRooms(allBookings, allRooms, date, roomType) {
    const bookedRoomNumbers = allBookings
      .filter(booking => booking.date === date)
      .map(booking => booking.roomNumber);
    const availableRooms = allRooms.filter(room => !bookedRoomNumbers.includes(room.number) && room.roomType === roomType);
    return availableRooms;
  }
  
  calculateTotalSpent(allRooms) {
    this.totalSpent = this.bookings.reduce((total, booked) => {
      total += allRooms.find(room => room.number === booked.roomNumber).costPerNight
      return total;
    }, 0);
    
    return this.totalSpent;
  }
}

export default Customer;
