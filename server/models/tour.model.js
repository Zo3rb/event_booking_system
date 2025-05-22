const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "A tour must have a description"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const TourModel = mongoose.model("Tour", tourSchema);

module.exports = TourModel;
