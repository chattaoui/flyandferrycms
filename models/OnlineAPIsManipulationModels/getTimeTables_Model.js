const mongoose = require("mongoose");

const getTimeTablesSchema = new mongoose.Schema({
  TimeStamp: {
    type: String,
  }, 
  
  ArriveDateTime: {
    type: String,
  },

  DepartDateTime: {
    type: String,
  },

  DepartPortName: {
    type: String,
  },

  DestinationPort: {
    type: String,
  },

  DestinationPortName: {
    type: String,
  },

  ShipName: {
    type: String,
  }




});

const getTimeTables_Collection = mongoose.model("__getTimeTables_Collection", getTimeTablesSchema);

module.exports = getTimeTables_Collection;
