const mongoose = require("mongoose");

const TrailerVehicleSchema = new mongoose.Schema({
  TrailerVehicleOperatorCode: {
    type: String,
  },
  TrailerVehicleCode: {
    type: String,
  },
  TrailerVehicleMinHeight: {
    type: String,
  },
  TrailerVehicleMaxHeight: {
    type: String,
  },
  TrailerVehicleMinLength: {
    type: String,
  },
  TrailerVehicleMaxLength: {
    type: String,
  },
  TrailerVehicleDescription: {
    type: String,
  },
  timeStamp: {
    type: String,
  }
});

const TrailerVehicle = mongoose.model("__TrailerVehicle_collectin", TrailerVehicleSchema);

module.exports = TrailerVehicle;
