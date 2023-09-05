const mongoose = require("mongoose");

const ApiSettingsSchema = new mongoose.Schema({
  agentAccountNumber: {
    type: String,
  },
  password: {
    type: String,
  },
  countryCode: {
    type: String,
  },
  currency: {
    type: String,
  },
});

const ApiSettings_Collection = mongoose.model("__ApiSettings_Collection", ApiSettingsSchema);

module.exports = ApiSettings_Collection;
