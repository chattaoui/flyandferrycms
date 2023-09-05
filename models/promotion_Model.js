const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({
  promotion_Title: {
    type: String,
  },

  promotion_Description: {
    type: String,
  },

  promotion_Image: {
    type: String,
  },
});

const promotion_Collection = mongoose.model("__promotion_Collection", promotionSchema);

module.exports = promotion_Collection;
