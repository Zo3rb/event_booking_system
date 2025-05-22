const express = require("express");

// Local importing
const {
  createTour,
  listTours,
  getTourById,
  updateTour,
  deleteTour,
} = require("../controllers/tour.controller");

const router = express.Router();

router.route("/").post(createTour).get(listTours);

router.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
