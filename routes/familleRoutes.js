const express = require("express");
const router = express.Router();
const familleController = require("../controller/FamilleController");

// Create an article
router.post("/create", familleController.create);

// Read all familles
router.get("/all", familleController.readAll);

// Read a specific famille
router.get("/readone/:id", familleController.readOne);

// Update an famille
router.put("/update/:id", familleController.update);

// Delete an famille
router.delete("/delete/:id", familleController.delete);

module.exports = router;
