const mongoose = require("mongoose");

const passengerCategorySchema = new mongoose.Schema({
  PassengerCategory: {
    type: String,
  },
  PassengerMinAge: {
    type: String,
  },
  PassengerMaxAge: {
    type: String,
  },
  timeStamp: {
    type: String,
  }
});

const PassengerCategory = mongoose.model("__PassengerCategory_collection", passengerCategorySchema);

module.exports = PassengerCategory;
