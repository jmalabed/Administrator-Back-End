const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },

    dateVisited: {
      type: Date,
      default: "",
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
    isInfected: {
      type: Boolean,
      default: false,
    },
    visiting: String,
    isEmployee: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
