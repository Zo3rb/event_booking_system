const eventService = require("../services/event.service");

const createEvent = async (req, res) => {
  try {
    const eventData = req.body;

    if (!eventData.name || !eventData.description) {
      return res.status(400).json({
        status: "fail",
        message: "Name and description are required fields.",
      });
    }

    const newEvent = await eventService.createEvent(eventData);

    res.status(201).json({
      status: "success",
      data: {
        event: newEvent,
      },
    });
  } catch (error) {
    console.error("Error in createTour controller:", error.message);

    res.status(500).json({
      status: "error",
      message: "Could not create the tour.",
    });
  }
};

const listEvents = async (req, res) => {
  try {
    const events = await eventService.listEvents();

    res.status(200).json({
      status: "success",
      results: events.length,
      data: {
        events,
      },
    });
  } catch (error) {
    console.error("Error in listTours controller:", error.message);
    res.status(500).json({
      status: "error",
      message: "Could not retrieve tours.",
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventService.readOneEvent(id);

    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: "event not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        event,
      },
    });
  } catch (error) {
    console.error(
      `Error in getTourById controller for ID ${req.params.id}:`,
      error.message
    );
    res.status(500).json({
      status: "error",
      message: "Could not retrieve the tour.",
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;

    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "No data provided for update.",
      });
    }

    const updatedEvent = await eventService.updateEvent(id, dataToUpdate);

    if (!updatedEvent) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found or no changes made.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        tour: updatedEvent,
      },
    });
  } catch (error) {
    console.error(
      `Error in updateTour controller for ID ${req.params.id}:`,
      error.message
    );

    res.status(500).json({
      status: "error",
      message: "Could not update the tour.",
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await eventService.deleteEvent(id);

    if (!deletedEvent) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found.",
      });
    }

    res.status(204).json({
      status: "success",
      message: deletedEvent,
    });
  } catch (error) {
    console.error(
      `Error in deleteTour controller for ID ${req.params.id}:`,
      error.message
    );
    res.status(500).json({
      status: "error",
      message: "Could not delete the tour.",
    });
  }
};

module.exports = {
  createEvent,
  listEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
