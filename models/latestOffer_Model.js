const mongoose = require("mongoose");

const latestOfferSchema = new mongoose.Schema({
  latestOffer_Title: {
    type: String,
  },

  latestOffer_Description: {
    type: String,
  },

  latestOffer_Image: {
    type: String,
  },
});

const latestOffer_Collection = mongoose.model("__latestOffer_Collection", latestOfferSchema);

module.exports = latestOffer_Collection;
