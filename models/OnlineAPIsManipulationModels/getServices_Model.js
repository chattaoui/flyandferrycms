const mongoose = require("mongoose");

const getServices_Schema = new mongoose.Schema({
  Code: {
    type: String,
  },

  Category: {
    type: String,
  },

  Cost: {
    type: String,
  },

  Description: {
    type: String,
  },
  TimeStamp:{
    type: String,

  }
});

const getServices_Collection = mongoose.model("__getServices_Collection", getServices_Schema);

module.exports = getServices_Collection;
