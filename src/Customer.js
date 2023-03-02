class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
    this.totalSpent = 0;
  }
  bookRoom(room) {
    if (!this.bookings.includes(room)) {
      this.bookings.push(room);
    } 
    this.calculateTotalSpent();
  }
  cancelBooking(booking) {
    this.bookings = this.bookings.filter((book) => book !== booking);
    this.calculateTotalSpent();
  }
  calculateTotalSpent() {
    this.totalSpent = this.bookings.reduce((total, room) => {
      return total + room.costPerNight;
    }, 0);
  }
}

export default Customer;
