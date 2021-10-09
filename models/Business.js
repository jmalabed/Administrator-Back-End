const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    pass: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
      // ret is the returned Mongoose document
      transform: (_doc, ret) => {
        delete ret.pass;
        return ret;
      },
    },
    id: false,
  }
);

const Business = mongoose.model("Business", businessSchema);
module.exports = Business;
