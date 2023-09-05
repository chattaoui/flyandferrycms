const express = require("express");
const router = express.Router();
const articleController = require("../controller/ArticleController");

// Create an article
router.post("/create", articleController.create);

// Read all articles
router.get("/all", articleController.readAll);

// Read a specific article
router.get("/readone/:id", articleController.readOne);

// Update an article
router.put("/update/:id", articleController.update);

// Delete an article
router.delete("/delete/:id", articleController.delete);

module.exports = router;
