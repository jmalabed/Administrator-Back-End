const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    datesVisited: {
      type: [Date],
      default: [""],
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
    isInfected: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
