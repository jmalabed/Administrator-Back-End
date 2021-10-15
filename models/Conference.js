const mongoose = require("mongoose");

const conferenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
  },
  isOccupied: Boolean,
  timeOccupied: Date,
  endTime: Date,
});

Conference = mongoose.model("Conference", conferenceSchema);
module.exports = Conference;
