const mongoose = require("mongoose");
const Joi = require("joi");

const familleSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },

  listearticles: [
    {
      article_id: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
      reference: { type: String},
      designation: { type: String },

    },
  ],
});

const Famille = mongoose.model("Famille", familleSchema);

const familleValidationSchema = Joi.object({
  nom: Joi.string().required(),
  description: Joi.string().required(),

});

module.exports = { Famille, familleValidationSchema };