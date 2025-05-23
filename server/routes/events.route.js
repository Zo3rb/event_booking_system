const express = require("express");

// Local importing
const {
  createEvent,
  listEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

const router = express.Router();

router.route("/").post(createEvent).get(listEvents);

router.route("/:id").get(getEventById).patch(updateEvent).delete(deleteEvent);

module.exports = router;
