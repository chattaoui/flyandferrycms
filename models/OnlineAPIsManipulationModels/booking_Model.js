
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  Context: Object,
  Passengers: Object,
  ContactDetails: Object,
  FerryComponents: Object,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
