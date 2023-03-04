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

let customers, rooms, bookings, selectedCustomer;

// event listeners

window.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

searchRoomsBtn.addEventListener("click", (event) => {
  event.preventDefault()
  const selectedDate = dateInput.value.replaceAll('-', '/');
  const selectedRoomType = roomTypeSelect.value;
  const availableRooms = selectedCustomer.findAvailableRooms(bookings, rooms, selectedDate, selectedRoomType)
  console.log('available rooms', availableRooms);
  displayAvailableRooms(availableRooms);
})

// when click booked room, create a booking object(must include userID, room# and date)
// need to be able to click on one of the rooms to select and when you click the room, the data updates 
// event listeners to each available room that listens for a click
// on the click, selectedroom on customer is updated
// then event listener for the book button 
// access ID and room number from selected customer and then the date from the form 
// create a new booking object with that data and then post
// update table on DOM with booking data

// send that object in a post request to the server

// functions

function fetchData() {
  Promise.all([getData("customers"), getData("rooms"), getData("bookings")])
    .then(([customersData, roomsData, bookingsData]) => {
      customers = customersData.customers.map((customer) => new Customer(customer));
      rooms = roomsData.rooms.map((room) => new Room(room));
      bookings = bookingsData.bookings.map((booking) => new Booking(booking));
      console.log(customers, rooms, bookings);
      setCustomer()
      if (selectedCustomer) {
        displayUserBookings(selectedCustomer);
      }
      displayTotalSpent();
      return { customers, rooms, bookings };
    })
    .catch((error) => {
      console.log(error);
    });
}


function displayAvailableRooms(availableRooms) {
  availableRoomsList.innerHTML = "";
  if (availableRooms.length > 0) {
    availableRooms.forEach(room => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>Room ${room.number}, ${room.roomType}, ${room.bidet ? "with bidet" : "without bidet"}, ${room.numBeds} ${room.bedSize} bed(s), $${room.costPerNight} per night</span>
        <button class="book-room-btn" data-room-number="${room.number}">Book Room</button>`;
      availableRoomsList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "No rooms available for this date";
    availableRoomsList.appendChild(li);
  }
}

function setCustomer() {
  selectedCustomer = customers[2]; 
}

function displayUserBookings(customer) {
  let customerBookings = customer.myBookings(bookings)

  bookingDetails.innerHTML = "";
  customerBookings.forEach(booking => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${booking.date}</td>
      <td>${booking.roomNumber}</td>`;
    bookingDetails.appendChild(row);
  });
}

function displayTotalSpent() {
    selectedCustomer.calculateTotalSpent(rooms);
    totalSpent.textContent = `$${selectedCustomer.totalSpent.toFixed(2)}`;

}

