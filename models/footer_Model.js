const mongoose = require("mongoose");

const FooterSchema = new mongoose.Schema({
    FooterText: {
    type: String,
  },

  CopyrightText: {
    type: String,
  },


});

const Footer_Collection = mongoose.model("__Footer_Collection", FooterSchema);

module.exports = Footer_Collection;