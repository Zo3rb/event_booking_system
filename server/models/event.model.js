const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Each event should have a name"],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "Each event should have a duration"],
      default: 1,
    },
    maxGroupSize: {
      type: Number,
      required: [true, "Each event should have max group size"],
    },
    difficulty: {
      type: String,
      trim: true,
    },
    ratingsAverage: {
      type: Number,
    },
    ratingsQuantity: {
      type: Number,
    },
    price: {
      type: Number,
      required: [true, "Each event should have a prize"],
    },
    summary: {
      type: String,
      required: [true, "Each event should have a summary"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Each event should have a description"],
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "Each event should have an image cover"],
      trim: true,
    },
    images: {
      type: [String],
    },
    startDates: {
      type: [Date],
    },
  },
  {
    timestamps: true,
  }
);

const EventModel = mongoose.model("Event", eventSchema);

module.exports = EventModel;
