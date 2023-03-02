// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
import Customer from "./Customer";
import Room from "./Room";
import Booking from "./Booking";
import { getData, postData, deleteData } from "./api-calls";

// query selectors

// event listeners

window.addEventListener("load", () => {
  fetchData();
});

// functions

function fetchData() {
  Promise.all([getData("customers"), getData("rooms"), getData("bookings")])
    .then(([customersData, roomsData, bookingsData]) => {
      const customers = customersData.customers.map((customer) => new Customer(customer));
      const rooms = roomsData.rooms.map((room) => new Room(room));
      const bookings = bookingsData.bookings.map((booking) => new Booking(booking));
      console.log(customers, rooms, bookings);
    })
    .catch((error) => {
      console.log(error);
    });
}

