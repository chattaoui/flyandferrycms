const mongoose = require("mongoose");

const getRoutesSchema = new mongoose.Schema({
  TimeStamp: {
    type: String,
  }, 
  
  DepartPort: {
    type: String,
  },

  DestinationPort: {
    type: String,
  },

  DepartPortCountry: {
    type: String,
  },

  DepartPortName: {
    type: String,
  },

  DepartPortLatitude: {
    type: String,
  },

  DepartPortLongitude: {
    type: String,
  },

  DestinationPortCountry: {
    type: String,
  },

  DestinationPortName: {
    type: String,
  },

  DestinationPortLatitude: {
    type: String,
  },
  DestinationPortLongitude: {
    type: String,
  }


});

const getRoutes_Collection = mongoose.model("__getRoutes_Collection", getRoutesSchema);

module.exports = getRoutes_Collection;
