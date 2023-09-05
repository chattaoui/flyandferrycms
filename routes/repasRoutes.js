const express = require("express");
const router = express.Router();
const repasController = require("../controller/RepasController");

// Routes
router.post("/create", repasController.create);
router.get("/all", repasController.readAll);
router.get("/:id", repasController.readOne);
router.put("/:id", repasController.update);
router.delete("/:id", repasController.delete);

module.exports = router;