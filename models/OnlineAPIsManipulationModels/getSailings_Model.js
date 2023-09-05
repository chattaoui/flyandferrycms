const mongoose = require("mongoose");

const getSailingsSchema = new mongoose.Schema({
  timeStamp: {
    type: String,
  }, 
  
  ArriveDateTime: {
    type: String,
  },

  DepartDateTime: {
    type: String,
  },

  DepartPort: {
    type: String,
  },

  DestinationPort: {
    type: String,
  },

  FareType: {
    type: String,
  },

  GrossAmount: {
    type: String,
  },

  OnBoardAccommodationServicesCode: {
    type: String,
  },

  shipName: {
    type: String,
  }


});

const getSailings_Collection = mongoose.model("__getSailings_Collection", getSailingsSchema);

module.exports = getSailings_Collection;
