const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema({
  Slider_Title: {
    type: String,
  },

  Slider_Description: {
    type: String,
  },

  Slider_Image: {
    type: String,
  },
});

const Slider_Collection = mongoose.model("__Slider_Collection", SlideSchema);

module.exports = Slider_Collection;
