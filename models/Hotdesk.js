const mongoose = require("mongoose");

const hotdeskSchema = new mongoose.Schema({
  name: String,
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
  },
  isOccupied: Boolean,
  timeOccupied: Date,
});
HotDesk = mongoose.model("HotDesk", hotdeskSchema);
module.exports = HotDesk;
