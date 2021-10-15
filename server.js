// dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/db");
const PORT = process.env.PORT || 9000;
const methodOverride = require("method-override");
const db = mongoose.connection;
const cors = require("cors");

// Controllers
const conferenceController = require("./controllers/conference");
const hotdeskController = require("./controllers/hotdesk");
const personController = require("./controllers/person");
const authController = require("./controllers/auth");
// Cors

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS"));
    }
  },
};

// MiddleWare

app.use(express.json());
app.use(cors(corsOptions));
//use method override
app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form
//use public folder for static assets
app.use(express.static("public"));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI =
  process.env.MONGODB_URI || `mongodb://localhost/officeCulture`;

// Connect to Mongo
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

// open the connection to mongo
db.on("open", () => {});

// Routing
app.use("/auth", authController);
app.use("/conference", conferenceController);
app.use("/hotdesk", hotdeskController);
app.use("/person", personController);

// Listen
app.listen(PORT, (req, res) => {
  console.log("listening on port", PORT);
});
