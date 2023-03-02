import chai from "chai";
const expect = chai.expect;
import { rooms, bookings, customers } from "./sample-data.js";
import Room from "../src/Room.js";

describe("Room", function () {
  let testRoom;

  beforeEach(function () {
    testRoom = new Room(rooms[0]);
  });

  it("should have a room number and room type", function () {
    expect(testRoom.number).to.equal(1);
    expect(testRoom.roomType).to.equal("residential suite");
  });

  it("should have a bidet property", function () {
    expect(testRoom.bidet).to.equal(true);
  });

  it("should have a bed size property", function () {
    expect(testRoom.bedSize).to.equal("queen");
  });

  it("should have a number of beds property", function () {
    expect(testRoom.numBeds).to.equal(1);
  });

  it("should have a cost per night property", function () {
    expect(testRoom.costPerNight).to.equal(358.4);
  });

  it("should have a property that has booking status defaulted to false", function () {
    expect(testRoom.isBooked).to.equal(false);
  });

  it("should be able to update booking status when a room is booked", function () {
    testRoom.getBooked();
    expect(testRoom.isBooked).to.equal(true);
  });

  it("should not be able to get booked again if already booked", function () {
    testRoom.getBooked();
    expect(testRoom.isBooked).to.be.true;
    testRoom.getBooked();
    expect(testRoom.isBooked).to.be.true;
  });
});
