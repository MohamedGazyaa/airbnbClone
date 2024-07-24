// Importing modules

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Place = require("./models/Place");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

const bcryptSalt = bcrypt.genSaltSync(10);
// Add to env
const jwtSecret = "dasdasfefwvbybcae";

// Creating express app and setting connection to frontend app

const app = express();
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    // Add to env
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

// app.use((req,res,next)=>{
//   // Validate request
//   // if ok return next()
//   // else return res.send(401, "Unauthorized")
// })
// Connecting MongoDB to app

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.djskaj1.mongodb.net/?retryWrites=true&w=majority`
);

// API end points

// Auth Controller
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
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("logout successful");
});

app.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the 'Authorization' header
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        const { name, email } = await User.findById(userData.id);
        res.json({ name, email });
      }
    });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + ".png";
  const dest = path.join(__dirname, "uploads", newName);

  try {
    await imageDownloader.image({
      url: link,
      dest: dest,
    });
    res.json(newName);
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error: "Failed to download image" });
  }
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.post("/add-place", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the 'Authorization' header
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        const { _id } = await User.findById(userData.id);
        try {
          const {
            title,
            address,
            addedPhotos,
            details,
            selectedPerks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          } = req.body;
          const PlaceDoc = await Place.create({
            owner: _id,
            title,
            address,
            photos: addedPhotos,
            description: details,
            perks: selectedPerks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          });
          res.json(PlaceDoc);
        } catch (err) {
          console.log(err);
          res.status(422).json("why");
        }
      }
    });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
});

app.get("/user-places", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the 'Authorization' header
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
      }
    });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
});

app.get("/place/:id", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the 'Authorization' header
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        const { id } = req.params;
        res.json(await Place.findById(id));
      }
    });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
});

app.put("/update-place", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the 'Authorization' header
  const {
    id,
    title,
    address,
    addedPhotos,
    details,
    selectedPerks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price
  } = req.body;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        const placeDoc = await Place.findById(id);
        if (userData._id === placeDoc.owner,toString()) {
          placeDoc.set({
            title,
            address,
            photos: addedPhotos,
            description: details,
            perks: selectedPerks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          });
          await placeDoc.save();
          res.json("Place upadted successfully")
        }else{
          res.json("User is not the owner of the place")
        }
      }
    });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
});

app.get("/places", async (req, res)=>{
  res.json(await Place.find());
})

// Listening to requests

app.listen(4000, (port) => {
  console.log("App Listening to port " + 4000);
});

// MongoDB cluster password: ow87czmoxIthUuhs
