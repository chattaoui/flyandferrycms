const express = require("express");
const router = express.Router();
const ListeprixController = require("../controller/ListeprixController");

// Create an Listeprix
router.post("/create", ListeprixController.create);

// Read all Listeprixs
router.get("/all", ListeprixController.readAll);

// Read a specific Listeprix
router.get("/readone/:id", ListeprixController.readOne);


//get all fournisseurs by reference article 
router.get("/getfournisseurs/:val", ListeprixController.getfournisseurs);

// Update an Listeprix
router.put("/update/:id", ListeprixController.update);

// Delete an Listeprix
router.delete("/delete/:id", ListeprixController.delete);

module.exports = router;
