const mongoose = require("mongoose");
const MONGODB_URI =
  process.env.MONGODB_URI || `mongodb://localhost/officeCulture`;

// Connection string (we will be replacing this later with environmental variables)
// Connect to Mongo
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

// Error / Disconnection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));
