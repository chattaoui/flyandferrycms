const { Famille, FamilleValidationSchema } = require("../model/Famille");
const validateData = require("../validation/validation");
// CRUD operations
const familleController = {
  create: async (req, res) => {
    try {
      const { nom, description, listearticles  } = req.body;
      const famille = new Famille({ nom, description, listearticles   });
      await famille.save();
      res.status(201).json({ message: "famille added successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },



  readAll: async (req, res) => {
    try {
      const familles = await Famille.find();
      res.json(familles);
    } catch (error) {
      res.status(400).send(error);
    }
  },





  readOne: async (req, res) => {
    try {
      const familles = await Famille.findById(req.params.id);
      res.json(familles);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const testValidation = validateData(ArticleValidationSchema, req.body);
      if (testValidation) {
        return res.status(400).json({ errors: testValidation });
      }
      const { designation, quantites, unit ,categorie, reference,prix,fournisseur } = req.body;
      const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,
        { designation, quantites, unit ,categorie, reference,prix,fournisseur },
        { new: true }
      );
      res
        .status(201)
        .json({ message: "Article modifié", article: updatedArticle });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      await Article.findByIdAndDelete(req.params.id);
      res.status(201).json({ message: "Article Supprimé" });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = familleController;
