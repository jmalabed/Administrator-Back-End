// dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/db");
const PORT = process.env.PORT || 9000;
const cors = require("cors");

// Controllers
const conferenceController = require("./controllers/conference");
const hotdeskController = require("./controllers/hotdesk");
const personController = require("./controllers/person");
const authController = require("./controllers/auth");
// Cors

const whitelist = [
  "http://localhost:3000",
  "https://office-culture.surge.sh/",
  "https://office-culture.herokuapp.com/",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS"));
    }
  },
};

// MiddleWare

app.use(cors(corsOptions));
app.use(express.json());

// Routing
app.use("/auth", authController);
app.use("/conference", conferenceController);
app.use("/hotdesk", hotdeskController);
app.use("/person", personController);

// Listen
app.listen(PORT, (req, res) => {
  console.log("listening on port", PORT);
});
