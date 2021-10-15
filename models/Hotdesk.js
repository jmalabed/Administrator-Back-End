const mongoose = require("mongoose");

const hotdeskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
  },
  isOccupied: Boolean,
  timeOccupied: Date,
  endTime: Date,
});
HotDesk = mongoose.model("HotDesk", hotdeskSchema);
module.exports = HotDesk;
