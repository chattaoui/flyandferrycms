const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createuser", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getuser", userController.getUser);
router.get("/all", userController.getAllUser);

module.exports = router;
