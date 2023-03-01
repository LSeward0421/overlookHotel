class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
    this.totalSpent = 0;
  }
  bookRoom(room) {
    this.bookings.push(room);
    this.calculateTotalSpent()
  }
  cancelBooking(room) {
  //  takes in a room object
  // adds to bookings array
  // calls calculate total spent to update totalSpent
  }
  calculateTotalSpent() {
    this.totalSpent = this.bookings.reduce((total, room) => {
      return total + room.costPerNight
    }, 0)
  }
}

// will need to refactor probably once data is fetched. 

export default Customer;