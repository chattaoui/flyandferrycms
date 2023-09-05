const { Listeprix, ListeprixValidationSchema } = require("../model/Listeprix");
const validateData = require("../validation/validation");
// CRUD operations
const ListeprixController = {
  create: async (req, res) => {
    console.log(req.body);

    try {
      // const testValidation = validateData(ArticleValidationSchema, req.body);
      // if (testValidation) {
      //   return res.status(400).json({ errors: testValidation });
      // }
      const { nom, datedebut, datefin ,listeprixarticles  } = req.body;
     
      const listeprix = new Listeprix({ nom, datedebut, datefin ,listeprixarticles  });
      await listeprix.save();
      res.status(201).json({ message: "listeprix ajouté successfully" });
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  },
  readAll: async (req, res) => {
    try {
      const listeprixs = await Listeprix.find();
      res.json(listeprixs);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  readOne: async (req, res) => {
    try {
      const listeprix = await Listeprix.findById(req.params.id);
      res.json(listeprix);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getfournisseurs: async (req, res) => {
    try {
      // Find elements with matching reference
      const listefournisseurs = [];
      const listeprixs = await Listeprix.find();

    
      listeprixs.forEach((x) => {
        x.listeprixarticles.forEach((liste) => {

        if (liste.reference === req.params.val) {
          listefournisseurs.push(x);
        }
      });
    });

      // Return the matching elements as the response
      res.json(listefournisseurs);
  
      // Log the matching elements for debugging
    } catch (error) {
      res.status(400).send(error);
    }
  },
  
  update: async (req, res) => {
    try {
      const testValidation = validateData(listeprixValidationSchema, req.body);
      if (testValidation) {
        return res.status(400).json({ errors: testValidation });
      }
      const { name, datedebut,datefin, listearticles } = req.body;
      const updatedlisteprix = await listeprix.findByIdAndUpdate(
        req.params.id,
        { name, datedebut, listearticles ,datefin},
        { new: true }
      );
      res
        .status(201)
        .json({ message: "listeprix modifié", listeprix: updatedlisteprix });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      await listeprix.findByIdAndDelete(req.params.id);
      res.status(201).json({ message: "listeprix Supprimé" });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = ListeprixController;
