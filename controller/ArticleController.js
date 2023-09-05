const { Article, ArticleValidationSchema } = require("../model/Article");
const validateData = require("../validation/validation");
// CRUD operations
const articleController = {
  create: async (req, res) => {
    console.log(req.body);

    try {
     
      const { designation, quantites, unit ,categorie, reference,prix,fournisseur,quantiteminimal, quantitesecurite } = req.body;
      const article = new Article({ designation, quantites, unit ,categorie, reference,prix,fournisseur,quantitesecurite,quantiteminimal  });
      await article.save();
      res.status(201).json({ message: "Article ajouté successfully" });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  readAll: async (req, res) => {
    try {
      const articles = await Article.find();
      res.json(articles);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  readOne: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      res.json(article);
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

module.exports = articleController;
