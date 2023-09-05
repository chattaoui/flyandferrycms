const mongoose = require("mongoose");

const repasSchema = new mongoose.Schema({
  designation: { type: String, required: true },
  equipement: { type: String, required: true },
  categorie_id: { type: mongoose.Schema.Types.ObjectId, ref: "Categorie" },
  articles: [
    {
      article_id: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
      quantites: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Repas", repasSchema);
