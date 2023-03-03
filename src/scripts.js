// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
import Customer from "./Customer";
import Room from "./Room";
import Booking from "./Booking";
import { getData, postData, deleteData } from "./api-calls";

// query selectors
const dateInput = document.querySelector("#date");
const roomTypeSelect = document.querySelector("#roomType");
const searchRoomsBtn = document.querySelector("#searchRooms");
const availableRoomsList = document.querySelector("#available-rooms");
const bookRoomBtn = document.querySelector("#bookRoom");
const noRoomMsg = document.querySelector("#noRoomMsg");
const bookingDetails = document.querySelector("#bookingDetails");
const totalSpent = document.querySelector("#totalSpent");

let customers, rooms, bookings; 

// event listeners

window.addEventListener("load", () => {
  fetchData();
});

searchRoomsBtn.addEventListener("click", (event) => {
  event.preventDefault()
})


// functions

function fetchData() {
  Promise.all([getData("customers"), getData("rooms"), getData("bookings")])
    .then(([customersData, roomsData, bookingsData]) => {
      customers = customersData.customers.map((customer) => new Customer(customer));
      rooms = roomsData.rooms.map((room) => new Room(room));
      bookings = bookingsData.bookings.map((booking) => new Booking(booking));
      console.log(customers, rooms, bookings);
      return { customers, rooms, bookings };
    })
    .catch((error) => {
      console.log(error);
    });
}
