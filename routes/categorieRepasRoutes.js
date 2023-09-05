const express = require("express");
const router = express.Router();
const CategorieRepasController = require("../controller/CategorieRepasController");

// Create an article
router.post("/create", CategorieRepasController.create);

// Read all articles
router.get("/all", CategorieRepasController.readAll);

// Read a specific article
router.get("/readone/:id", CategorieRepasController.readOne);

// Update an article
router.put("/update/:id", CategorieRepasController.update);

// Delete an article
router.delete("/delete/:id", CategorieRepasController.delete);

module.exports = router;
