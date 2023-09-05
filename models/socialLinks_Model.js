const mongoose = require("mongoose");

const socialLinksSchema = new mongoose.Schema({
  facebook: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  snapchat: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  pinterest: {
    type: String,
    required: true,
  },
  youtube: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
});

const SocialLinks = mongoose.model("__SocialLinks", socialLinksSchema);

module.exports = SocialLinks;
