const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret =
  process.env.JWT_SECRET || "some string value only your app knows";
const { Strategy, ExtractJwt } = require("passport-jwt");
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

// Require the user model
const Business = require("../models/Business");
const strategy = new Strategy(opts, function (jwt_payload, done) {
  Business.findById(jwt_payload.id)
    .then((business) => done(null, business))
    .catch((err) => done(err));
});

passport.use(strategy);
passport.initialize();

// this is the name of the variable to be used in the rest of the routes.
const requireToken = passport.authenticate("jwt", { session: false });

const createBisToken = (req, bis) => {
  if (
    !bis.name ||
    !req.body.pass ||
    !bcrypt.compareSync(req.body.pass, bis.pass)
  ) {
    const err = new Error("The provided username or password is incorrect");
    err.statusCode = 422;
    throw err;
  }
  return jwt.sign({ id: bis._id }, secret, { expiresIn: 36000 });
};

const handleValidateOwnership = (req, document) => {
  const ownerId = document.owner._id || document.owner;
  if (!req.user._id.equals(ownerId)) {
    return new Error("Unauthorized Access");
  } else {
    return document;
  }
};

module.exports = { handleValidateOwnership, requireToken, createBisToken };
