const mongoose = require("mongoose");
const Joi = require("joi");

const listeprixSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  datedebut: { type: String, required: true },
  datefin: { type: String, required: true },

  listeprixarticles : [
    {
      reference: { type: String, required: true },
      article: { type: String, required: true },
      prix: { type: String, required: true },
    },
  ],
});
const Listeprix = mongoose.model("Listeprix", listeprixSchema);

const ListeprixValidationSchema = Joi.object({
  nom: Joi.string().required(),
  listeprixarticles: Joi.required(),
  datedebut: Joi.string().required(),
  datefin: Joi.string().required(),


});
module.exports = { Listeprix, ListeprixValidationSchema };
