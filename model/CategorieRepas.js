const mongoose = require("mongoose");
const Joi = require("joi");

const categorieSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Categorie = mongoose.model("Categorie", categorieSchema);

const categorieValidationSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { Categorie, categorieValidationSchema };
