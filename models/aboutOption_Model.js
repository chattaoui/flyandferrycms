const mongoose = require("mongoose");

const AboutOptionSchema = new mongoose.Schema({
    typeInput: {
    type: String,
  },

  contenuInput: {
    type: String,
  },


});

const AboutOption_Collection = mongoose.model("__AboutOption_Collection", AboutOptionSchema);

module.exports = AboutOption_Collection;
