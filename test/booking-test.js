import chai from "chai";
const expect = chai.expect;
import { rooms, bookings, customers } from "./sample-data.js";
import Booking from "../src/Booking.js";

describe("Booking", function () {
  let testBooking, invalidBooking;

  beforeEach(function () {
    testBooking = new Booking("5fwrgu4i7k55hl6sz", 9, "2022/04/22", 1, rooms);

    invalidBooking = new Booking(
      "5fwrgu4i7k55hl6sz",
      9,
      "2022/04/22",
      999,
      rooms
    );
  });

  it("should return the booking details with correct room type and price", function () {
    const result = testBooking.getBookingDetails();
    expect(result).to.deep.equal({
      date: "2022/04/22",
      roomNumber: 1,
      roomType: "residential suite",
      price: 358.4,
    });
  });

  it("should return null for room type and price if the room is not found", function () {
    const result = invalidBooking.getBookingDetails();
    expect(result).to.be.null;
  });

  it("should calculate the correct booking price", function () {
    expect(testBooking.calculateBookingPrice()).to.equal(358.4);
  });

  it("should set all booking properties to null when cancelled", function () {
    testBooking.cancelBooking();
    expect(testBooking.id).to.be.null;
    expect(testBooking.userId).to.be.null;
    expect(testBooking.date).to.be.null;
    expect(testBooking.roomNumber).to.be.null;
  });
});
