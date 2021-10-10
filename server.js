// dependencies
const express = require("express");
const app = express();
require("./db/db");
const PORT = process.env.PORT || 9000;
const methodOverride = require("method-override");
const cors = require("cors");
// Controllers
const businessController = require("./controllers/business");
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
// Routing
app.use("/auth", authController);
app.use("/business", businessController);
app.use("/conference", conferenceController);
app.use("/hotdesk", hotdeskController);
app.use("/person", personController);
// Listen
app.listen(PORT, (req, res) => {
  console.log("listening on port", PORT);
});
