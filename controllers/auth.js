const express = require("express");
const Business = require("../models/Business");
const bcrypt = require("bcrypt");
const { createBisToken, requireToken } = require("../middleware/auth");

const router = express.Router();

// get all
// get route for dev checking
router.get("/", async (req, res) => {
  try {
    const allBis = await Business.find();
    res.status(200).json(allBis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Register Route - Sign Up
router.post("/register", async (req, res, next) => {
  // password hash
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.pass, salt);
    const inputPass = req.body.pass;
    req.body.pass = passwordHash;
    // pass password to user model
    const newBis = await Business.create(req.body);
    console.log(newBis);
    if (newBis) {
      // reset req.body.pass to user password nohash
      req.body.pass = inputPass;
      const authenticatedToken = createBisToken(req, newBis);
      //response status message
      res.status(201).json({
        user: newBis,
        isLoggedIn: true,
        token: authenticatedToken,
      });
    } else {
      res.status(400).json({ error: "Error on User register route" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// SIGN IN
//
router.post("/login", async (req, res) => {
  try {
    const loggingBis = req.body.name;
    const foundBis = await Business.findOne({ name: loggingBis });
    const token = await createBisToken(req, foundBis);
    res.status(200).json({
      bis: foundBis,
      isLoggedIn: true,
      token: token,
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Logout
// Get - ('/auth/logout')
router.get("/logout", requireToken, async (req, res, next) => {
  try {
    const currentBis = req;
    console.log(currentBis);
    delete req.user;
    res.status(200).json({
      message: `Logging out of ${currentBis}. Thank you!`,
      isLoggedIn: false,
      token: "",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//delete for b-e setup
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const deletedBis = await Business.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedBis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Routing

module.exports = router;
