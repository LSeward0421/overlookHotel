class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
    this.totalSpent = 0;
  }

  bookRoom(booking) {
    if (!this.bookings.find(b => b.id === booking.id)) {
      this.bookings.push(booking);
    }
    return this.bookings;
  }
  
  myBookings(bookingData) {
    this.bookings = bookingData.filter(booking => booking.userId === this.id);
    this.bookings.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    return this.bookings;
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
