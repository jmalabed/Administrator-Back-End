const express = require("express");
const Business = require("../models/Business");
const bcrypt = require("bcrypt");
const { createUserToken, requireToken } = require("../middleware/auth");

const router = express.Router();

// Register Route
const register = async (req, res, next) => {
  // password hash
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.pass, salt);
    const inputPass = req.body.pass;
    req.body.pass = passwordHash;
    // pass password to user model
    const newUser = await Business.create(req.body);
    console.log(newUser);
    if (newUser) {
      // reset req.body.pass to user password nohash
      req.body.pass = inputPass;
      const authenticatedUserToken = createUserToken(req, newUser);
      res.status(201).json({
        user: newUser,
        isLoggedIn: true,
        token: authenticatedUserToken,
      });
    } else {
      res.status(400).json({ error: "Error on User register route" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// SIGN IN
const login = async (req, res) => {
  try {
    const loggingUser = req.body.user;
    const foundUser = await Business.findOne({ user: loggingUser });
    const token = await createUserToken(req, foundUser);
    res.status(200).json({
      user: foundUser,
      isLoggedIn: true,
      token: token,
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// Logout
// Get - ('/auth/logout')
router.get("/logout", requireToken, async (req, res, next) => {
  try {
    const currentUser = req.user.username;
    delete req.user;
    res.status(200).json({
      message: `${currentUser} currently logged in`,
      isLoggedIn: false,
      token: "",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Routing
router.post("/register", register);
router.post("/login", login);
module.exports = router;
