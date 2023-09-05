const mongoose = require("mongoose");
const Joi = require("joi");

const siteSchema = new mongoose.Schema({
  reference: { type: String, required: true },
  intitule: { type: String, required: true },
  adresse: { type: String, required: true },


});

const site = mongoose.model("site", siteSchema);

const siteValidationSchema = Joi.object({
    reference: Joi.string().required(),
  intitule: Joi.string().required(),
  adresse: Joi.string().required(),


});

module.exports = { site, siteValidationSchema };