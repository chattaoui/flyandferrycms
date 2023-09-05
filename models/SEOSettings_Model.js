const mongoose = require("mongoose");

const SEOSettingsSchema = new mongoose.Schema({
  Website_Title: {
    type: String,
  },
  Website_URL: {
    type: String,
  },

  Meta_Description: {
    type: String,
  },

  Meta_Keywords: {
    type: String,
  },

});

const SEOSettings_Collection = mongoose.model("__SEOSettings_Collection", SEOSettingsSchema);

module.exports = SEOSettings_Collection;
