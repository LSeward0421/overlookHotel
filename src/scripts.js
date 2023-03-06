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
const loginForm = document.querySelector('#login form');
const mainContent = document.querySelector('.container');

let customers, rooms, bookings, selectedCustomer, availableRooms

// event listeners

window.addEventListener("load", () => {
  fetchData();
});

searchRoomsBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchRooms();
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const matchingCustomer = customers.find(customer => username === `customer${customer.id}` && password === 'overlook2021');
  
  if (matchingCustomer) {
    setCustomer(matchingCustomer.id);
    mainContent.style.display = 'flex';
    document.querySelector('#login').style.display = 'none';
    document.querySelector('#bookARoom').style.display = 'flex';
    document.querySelector('#bookings').style.display = 'flex';
  } else {
    alert('Invalid username or password');
  }
});




// functions

function fetchData() {
  Promise.all([getData("customers"), getData("rooms"), getData("bookings")])
    .then(([customersData, roomsData, bookingsData]) => {
      customers = customersData.customers.map((customer) => new Customer(customer));
      rooms = roomsData.rooms.map((room) => new Room(room));
      bookings = bookingsData.bookings.map((booking) => new Booking(booking));
    })
    .catch((error) => {
      console.log(error);
    });
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
        <button class="book-room-btn" data-room-number="${room.number}" id=${room.number}>Book Room</button>`;
      availableRoomsList.appendChild(li);
    });
    availableRooms.forEach((room) => {
      document.getElementById(`${room.number}`).addEventListener("click", (event) => {
          const roomNumber = event.target.id;
          postBooking(roomNumber);
        });
    });
  } else {
    const li = document.createElement("li");
    li.textContent =
      "We sincerely apologize. There are no rooms available on that date. Please make another selection.";
    availableRoomsList.appendChild(li);
  }
}

function setCustomer(customerId) {
  getData(`customers/${customerId}`)
    .then(customerData => {
      console.log('get single customer data', customerData)
      selectedCustomer = new Customer(customerData);
      console.log(customerData);
      displayUserBookings(selectedCustomer);
      displayTotalSpent();
    })
    .catch(error => console.log(error));
}


function displayUserBookings(customer) {
  let customerBookings = customer.myBookings(bookings);
  console.log(customerBookings)
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
  console.log('selectedCustomer.totalSpent:', selectedCustomer.totalSpent);
}

function postBooking(selectedRoomNumber) {
  const selectedDate = dateInput.value.replace(/-/g, "/");
  const bookingData = {
    userID: selectedCustomer.id,
    date: selectedDate,
    roomNumber: parseInt(selectedRoomNumber)
  };
  postData(bookingData)
  .then(response => {
    console.log('post data .then response ', response)
    selectedCustomer.bookRoom(response);
    bookings.push(new Booking(response));
    console.log(bookings);
    refreshData();
  })
  const bookingButton = document.getElementById(`${selectedRoomNumber}`)
  bookingButton.innerText = 'test'
  bookingButton.disabled = true;
}

function refreshData() {
  fetchData()
  displayAvailableRooms(availableRooms);
  displayUserBookings(selectedCustomer);
  displayTotalSpent();
}

// can still double book rooms 
// weird bug with trying to switch room type on same day and not being able to book after booking a room on that day. not sure if that matters?
// DOM display alllll messed up. 
// doesn't update the available rooms if I booked a room and then switch to another day 
// upon logging in, the total.spent is 0 in the console
