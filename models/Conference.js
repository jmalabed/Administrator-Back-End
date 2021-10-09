const mongoose = require("mongoose");

const conferenceSchema = new mongoose.Schema({
  name: String,
  isOccupied: Boolean,
  timeOccupied: Date,
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
  },
});

Conference = mongoose.model("Conference", conferenceSchema);
module.exports = Conference;
