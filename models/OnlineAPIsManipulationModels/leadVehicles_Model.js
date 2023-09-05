const mongoose = require("mongoose");

const leadVehicleSchema = new mongoose.Schema({
  LeadVehicleOperatorCode: {
    type: String,
  },
  LeadVehicleCode: {
    type: String,
  },
  LeadVehicleMinHeight: {
    type: String,
  },
  LeadVehicleMaxHeight: {
    type: String,
  },
  LeadVehicleMinLength: {
    type: String,
  },
  LeadVehicleMaxLength: {
    type: String,
  },
  LeadVehicleDescription: {
    type: String,
  },
  timeStamp: {
    type: String,
  }
});

const LeadVehicle = mongoose.model("__LeadVehicle_collectin", leadVehicleSchema);

module.exports = LeadVehicle;
