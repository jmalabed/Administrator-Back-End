const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  email: String,
  lastDateVisited: String,
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
  },
  isInfected: Boolean,
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
