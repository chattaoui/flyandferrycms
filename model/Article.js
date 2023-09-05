const mongoose = require("mongoose");
const Joi = require("joi");

const articleSchema = new mongoose.Schema({
  designation: { type: String, required: true },
  categorie: { type: String, required: true },
  reference: { type: String, required: true, unique: true },
  fournisseur: { type: [String], required: true }, // Modified to allow an array of strings
  quantites: { type: Number },
  quantitesminimal: { type: Number },
  quantitesecurite: { type: Number },
  unit: { type: String },
  prix: { type: String },

});
const Article = mongoose.model("Article", articleSchema);

const ArticleValidationSchema = Joi.object({
  designation: Joi.string().required().min(5),
  quantites: Joi.number().min(1),
  quantitesminimal: Joi.number().min(1),
  quantitesecurite: Joi.number().min(1),
  unit: Joi.string(),
  categorie: Joi.string().required().min(5),
  fournisseur: Joi.array().items(Joi.string().required().min(3)).required(), // Modified to expect an array of strings
  reference: Joi.string().required().min(5),
  prix: Joi.number().min(1),
});

module.exports = { Article, ArticleValidationSchema };
