// dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
const methodOverride = require("method-override");

// Models

// MiddleWare
app.use(express.json());
// Routing

// Listen
app.listen(PORT, (req, res) => {
  console.log("listening on port", PORT);
});
