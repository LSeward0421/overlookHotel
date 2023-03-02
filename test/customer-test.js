import chai from "chai";
const expect = chai.expect;
import { rooms, bookings, customers } from "./sample-data.js";
import Customer from "../src/Customer.js";

describe("Customer", function () {
  let customer;

  beforeEach(function () {
    const customerExample = customers[0];
    customer = new Customer(customerExample);
  });

  it("should have an i.d.", function () {
    expect(customer).to.have.property("id").that.equals(1);
  });

  it("should have a name", function () {
    expect(customer).to.have.property("name").that.equals("Leatha Ullrich");
  });

  it("should have a bookings property that is an empty array", function () {
    expect(customer).to.have.property("bookings").that.deep.equals([]);
  });

  it("should have a totalSpent property that is initialized to 0", function () {
    expect(customer).to.have.property("totalSpent").that.equals(0);
  });

  it("should be able to book a room", function () {
    const sampleRoom = rooms[0];
    customer.bookRoom(sampleRoom);

    expect(customer.bookings).to.have.lengthOf(1);
    expect(customer.bookings[0]).to.equal(sampleRoom);
  });

  it("should be able to cancel a booking", function () {
    const sampleRoom = rooms[0];
    customer.bookRoom(sampleRoom);
    expect(customer.bookings).to.have.lengthOf(1);

    customer.cancelBooking(sampleRoom);
    expect(customer.bookings).to.have.lengthOf(0);
  });

  it("should not be able to book a room that is not available", function () {
    const room = rooms[0];
    customer.bookRoom(room);
    expect(customer.bookings).to.deep.equal([room]);
    customer.bookRoom(room);
    expect(customer.bookings).to.deep.equal([room]);
  });

  it("should calculate the total spent", function () {
    const sampleRoom1 = rooms[0];
    const sampleRoom2 = rooms[1];

    customer.bookRoom(sampleRoom1);
    customer.bookRoom(sampleRoom2);

    expect(customer.totalSpent).to.equal(
      sampleRoom1.costPerNight + sampleRoom2.costPerNight
    );

    customer.cancelBooking(sampleRoom2);

    expect(customer.totalSpent).to.equal(sampleRoom1.costPerNight);
  });
});
