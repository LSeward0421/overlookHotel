import Booking from "./Booking"

function getData (type) {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response
      }
    })
    .then(response => response.json())
};

// function postData(postObj) {
//   return fetch(`http://localhost:3001/api/v1/bookings`, {
//     method: 'POST',
//     body: JSON.stringify(postObj),
//     headers: {
//       'Content-type': 'application/json'
//     }
//   })
//     .then(response => {
//       console.log('POST request successful:', response);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       console.log('Error caught:', error);
//     });
// }

function postData(postObj, selectedCustomer, bookings) {
  return fetch(`http://localhost:3001/api/v1/bookings`, {
    method: 'POST',
    body: JSON.stringify(postObj),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => {
      console.log('POST request successful:', response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(response => {
      selectedCustomer.bookRoom(response);
      bookings.push(new Booking(response));
      console.log(bookings);
      console.log(selectedCustomer.bookings)
    })
    .catch((error) => {
      console.log('Error caught:', error);
    });
}



function deleteData(id) {
  return fetch(`http://localhost:3001/api/v1/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export { getData, postData, deleteData };