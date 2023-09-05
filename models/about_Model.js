const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  About_Title: {
    type: String,
  },

  About_Description: {
    type: String,
  },

  About_Image: {
    type: String,
  },
});

const About_Collection = mongoose.model("__About_Collection", AboutSchema);

module.exports = About_Collection;
