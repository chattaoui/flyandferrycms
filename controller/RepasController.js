const Repas = require("../model/Repas");

// CRUD operations
const repasController = {
  create: async (req, res) => {
    try {
      const { equipement,designation,categorie_id, articles } = req.body;
      const repas = new Repas({ equipement,designation,categorie_id, articles });
      await repas.save();
      res.status(201).json({ message: "Repas ajouté avec succès" });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  readAll: async (req, res) => {
    try {
      const repas = await Repas.find().populate("categorie_id", "name").populate("articles.article_id");
      res.json(repas);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  readOne: async (req, res) => {
    try {
      const repas = await Repas.findById(req.params.id).populate(
        "categorie_id",
        "name"
      );
      res.json(repas);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const { equipement,designation,categorie_id, articles } = req.body;
      const repas = await Repas.findByIdAndUpdate(
        req.params.id,
        { equipement,designation,categorie_id, articles },
        { new: true }
      );
      res.status(200).json({ message: "Repas modifié avec succès", repas });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      await Repas.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Repas supprimé avec succès" });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = repasController;
