const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
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

const EventModel = mongoose.model("Tour", eventSchema);

module.exports = EventModel;
