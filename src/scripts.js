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
const loginForm = document.querySelector("#login");
const loginErrorMsg = document.querySelector("#loginErrorMessage");
const mainContent = document.querySelector(".container");
const errorMessage = document.querySelector('#errorMessage')

let customers, rooms, bookings, selectedCustomer, availableRooms;

// event listeners

window.addEventListener("load", () => {
  fetchData();
});

searchRoomsBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchRooms();
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  verifyLogin();
});

// functions

function fetchData() {
  return Promise.all([getData("customers"), getData("rooms"), getData("bookings")])
    .then(([customersData, roomsData, bookingsData]) => {
      customers = customersData.customers.map(
        (customer) => new Customer(customer)
      );
      rooms = roomsData.rooms.map((room) => new Room(room));
      bookings = bookingsData.bookings.map((booking) => new Booking(booking));
      return { customers, rooms, bookings };
    })
    .catch(errorHandler);
}

function searchRooms() {
  const selectedDate = dateInput.value.replace(/-/g, "/");
  const selectedRoomType = roomTypeSelect.value;
  availableRooms = selectedCustomer.findAvailableRooms(
    bookings,
    rooms,
    selectedDate,
    selectedRoomType
  );
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
        <button class="book-room-btn" data-room-number="${room.number}" id=${
        room.number
      }>Book Room</button>`;
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
      "We sincerely apologize. There are no more rooms available on this date. Please make another selection.";
    availableRoomsList.appendChild(li);
  }
}

function verifyLogin() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const matchingCustomer = customers.find(
    (customer) =>
      username === `customer${customer.id}` && password === "overlook2021"
  );

  if (matchingCustomer) {
    setCustomer(matchingCustomer.id);
    mainContent.classList.remove("hidden");
    loginForm.classList.add("hidden");
  } else {
    loginErrorMsg.classList.remove("hidden");
  }
}

function setCustomer(customerId) {
  getData(`customers/${customerId}`)
    .then((customerData) => {
      console.log("get single customer data", customerData);
      selectedCustomer = new Customer(customerData);
      console.log(customerData);
      displayUserBookings(selectedCustomer);
      displayTotalSpent();
    })
    .catch((error) => console.log(error));
}

function displayUserBookings(customer) {
  let customerBookings = customer.myBookings(bookings);
  console.log(customerBookings);
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
  console.log("selectedCustomer.totalSpent:", selectedCustomer.totalSpent);
}

function postBooking(selectedRoomNumber) {
  const selectedDate = dateInput.value.replace(/-/g, "/");
  const bookingData = {
    userID: selectedCustomer.id,
    date: selectedDate,
    roomNumber: parseInt(selectedRoomNumber),
  };
  postData(bookingData)
  .then(response => {
    selectedCustomer.bookRoom(response);
    bookings.push(new Booking(response));
    console.log(bookings);
    console.log(selectedCustomer.bookings)
    return fetchData();
  })
  .then(refreshDOM);
}

function refreshDOM() {
  searchRooms();
  displayUserBookings(selectedCustomer);
  displayTotalSpent();
}

export function errorHandler(error) {
  errorMessage.classList.remove('hidden');
  errorMessage.textContent = `Uh-oh! Something went wrong! Try again Later!`;
  console.log(error);
}