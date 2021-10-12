const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "secretstringissecret";
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

module.exports = { requireToken, createBisToken };
