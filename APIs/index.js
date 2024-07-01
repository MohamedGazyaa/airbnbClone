// Importing modules

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const cookieParser = require("cookie-parser");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dasdasfefwvbybcae";

// Creating express app and setting connection to frontend app

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

// Connecting MongoDB to app

mongoose.connect(
  "mongodb+srv://mohamedgazya13:ow87czmoxIthUuhs@cluster0.djskaj1.mongodb.net/?retryWrites=true&w=majority"
);

// API end points

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passwordOk = bcrypt.compareSync(password, userDoc.password);
      if (passwordOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) {
              res.status(500).json({ error: "Token generation failed" });
            } else {
              res.json({ token });
            }
          }
        );
      } else {
        res.status(422).json({ error: "Invalid password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the 'Authorization' header
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        const {name, email} = await User.findById(userData.id);
        res.json({name,email});
      }
    });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("logout successful");
});

// Listening to requests

app.listen(4000);

// MongoDB cluster password: ow87czmoxIthUuhs
