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
const bookingDetails = document.querySelector("#bookingDetails");
const totalSpent = document.querySelector("#totalSpent");

let customers, rooms, bookings, selectedCustomer;

// event listeners

window.addEventListener("load", () => {
  fetchData();
  setCustomer()
});

searchRoomsBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchRooms();
});

// create a new booking object with that data and then post
// update table on DOM with booking data


// functions

function fetchData() {
  Promise.all([getData("customers"), getData("rooms"), getData("bookings")])
    .then(([customersData, roomsData, bookingsData]) => {
      customers = customersData.customers.map(
        (customer) => new Customer(customer)
      );
      rooms = roomsData.rooms.map((room) => new Room(room));
      bookings = bookingsData.bookings.map((booking) => new Booking(booking));
      console.log(customers, rooms, bookings);
      setCustomer();
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

function searchRooms() {
  const selectedDate = dateInput.value.replace(/-/g, "/");
  const selectedRoomType = roomTypeSelect.value;
  const availableRooms = selectedCustomer.findAvailableRooms(
    bookings,
    rooms,
    selectedDate,
    selectedRoomType
  );
  fetchData();
  displayAvailableRooms(availableRooms);
}

function displayAvailableRooms(availableRooms) {
  availableRoomsList.innerHTML = "";
  if (availableRooms.length > 0) {
    availableRooms.forEach((room) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>Room ${room.number}, ${room.roomType}, ${
        room.bidet ? "with bidet" : "without bidet"
      }, ${room.numBeds} ${room.bedSize} bed(s), $${
        room.costPerNight
      } per night</span>
        <button class="book-room-btn" data-room-number="${room.number}" id=${room.number}>Book Room</button>`;
      availableRoomsList.appendChild(li);
    });
    availableRooms.forEach((room) => {
      document
        .getElementById(`${room.number}`)
        .addEventListener("click", (event) => {
          const roomNumber = event.target.id;
          postBooking(roomNumber);
        });
    });
  } else {
    const li = document.createElement("li");
    li.textContent =
      "We sincerely apologize. There are no rooms available on that date.";
    availableRoomsList.appendChild(li);
  }
}

function setCustomer() {
  selectedCustomer = customers[5];
}

function displayUserBookings(customer) {
  let customerBookings = customer.myBookings(bookings);

  bookingDetails.innerHTML = "";
  customerBookings.forEach((booking) => {
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

function postBooking(selectedRoomNumber) {
  const selectedRoom = rooms.find((room) => room.number === selectedRoomNumber);

  selectedCustomer.selectRoom(selectedRoom);
  const selectedDate = dateInput.value.replace(/-/g, "/");
  const bookingData = {
    userID: selectedCustomer.id,
    date: selectedDate,
    roomNumber: parseInt(selectedRoomNumber),
  };
  postData(bookingData)
    .then((response) => {
      console.log("POST request successful:", response);
      selectedCustomer.bookRoom(selectedRoom);
      displayUserBookings(selectedCustomer);
      displayTotalSpent();
    })
    .catch((error) => {
      console.log(error);
    });
}

