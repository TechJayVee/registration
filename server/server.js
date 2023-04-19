const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = [];

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    if (!email || !firstName || !lastName || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required information." });
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }

    // Hash password and add new user to users array
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, firstName, lastName, password: hashedPassword };
    users.push(newUser);
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password." });
    }

    // Check if user exists
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Compare password hashes
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate and send JWT token
    const token = jwt.sign({ email: user.email }, "my_secret_key");
    res.status(200).json({ message: "Login successful.", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
