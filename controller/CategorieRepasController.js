const {
  Categorie,
  categorieValidationSchema,
} = require("../model/CategorieRepas");
const validateData = require("../validation/validation");

// CRUD operations
const categorieController = {
  create: async (req, res) => {
    try {
      const testValidation = validateData(categorieValidationSchema, req.body);
      if (testValidation) {
        return res.status(400).json({ errors: testValidation });
      }
      const { name } = req.body;
      const categorie = new Categorie({ name });
      await categorie.save();
      res.status(201).json({ message: "categorie ajouté successfully" });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  readAll: async (req, res) => {
    try {
      const categories = await Categorie.find();
      res.json(categories);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  readOne: async (req, res) => {
    try {
      const categorie = await Categorie.findById(req.params.id);
      res.json(categorie);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const testValidation = validateData(categorieValidationSchema, req.body);
      if (testValidation) {
        return res.status(400).json({ errors: testValidation });
      }
      const { name } = req.body;
      const categorie = await Categorie.findById(req.params.id);
      categorie.name = name;
      categorie.save();
      res.status(201).json({ message: "categorie modifié" });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      await Categorie.findByIdAndDelete(req.params.id);
      res.status(201).json({ message: "categorie Supprimé" });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = categorieController;
