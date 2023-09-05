const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, UserValidationSchema } = require("../model/User");
const secretKey = require("../config/generateKey");
const validateData = require("../validation/validation");
//registerUser

const UserController = {
  registerUser: async (req, res) => {
    try {
      const testValidation = validateData(UserValidationSchema, req.body);
      if (testValidation) {
        return res.status(400).json({ errors: testValidation });
      }

      const { name, email, password } = req.body;
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      // Create a JWT token

      const token = jwt.sign({ userId: user._id }, secretKey, {
        expiresIn: "1h",
      });
      console.log(token);
      res.json({ name: user.name, email: user.email, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  //one user
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  //all user
  getAllUser: async (req, res) => {
    try {
      await User.find().then((result) => {
        res.send(result);
      });
    } catch (err) {
      res.status(500).json({ error: error.message });
    }
  },
};

//login

module.exports = UserController;
