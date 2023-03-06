import Booking from "./Booking"
import { errorHandler } from "./scripts";

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

function postData(postObj) {
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
    .catch(errorHandler);
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