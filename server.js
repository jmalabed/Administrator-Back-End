// dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
import cors from "cors";
require("./db/db");

// Controllers
const conferenceController = require("./controllers/conference");
const hotdeskController = require("./controllers/hotdesk");
const personController = require("./controllers/person");
const authController = require("./controllers/auth");

const app = express();
const PORT = process.env.PORT || 9000;

// Cors

const whiteList = [
  "http://localhost:3000",
  "https://office-culture.surge.sh",
  "https://office-culture.herokuapp.com",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
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
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
