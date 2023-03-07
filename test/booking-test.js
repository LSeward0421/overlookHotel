import { expect } from 'chai';
import Booking from '../src/Booking.js'
import { bookings } from './sample-data';

describe('Booking', () => {
  describe('constructor', () => {
    let testBooking;

    beforeEach(() => {
      testBooking = new Booking(bookings[0]);
    });

    it('should create a new Booking object', () => {
      expect(testBooking).to.be.an.instanceOf(Booking);
    });

    it('should set the booking id', () => {
      expect(testBooking.id).to.equal(bookings[0].id);
    });

    it('should set the user id', () => {
      expect(testBooking.userId).to.equal(bookings[0].userID);
    });

    it('should set the date', () => {
      expect(testBooking.date).to.equal(bookings[0].date);
    });

    it('should set the room number', () => {
      expect(testBooking.roomNumber).to.equal(bookings[0].roomNumber);
    });
  });
});
