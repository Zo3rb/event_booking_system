const EventModel = require("../models/event.model");

class EventService {
  async createEvent(eventData) {
    try {
      const newEvent = await EventModel.create(eventData);

      return newEvent;
    } catch (error) {
      console.error("Error creating tour in service:", error.message);
      throw error;
    }
  }

  async listEvents() {
    try {
      const events = await EventModel.find({});

      return events;
    } catch (error) {
      console.error("Error listing tours in service:", error.message);
      throw error;
    }
  }

  async readOneEvent(id) {
    try {
      const event = await EventModel.findById(id);

      if (!event) {
        const error = new Error("Tour not found");
        error.status = 404;
        throw error;
      }

      return event;
    } catch (error) {
      console.error(
        `Error reading tour with ID ${id} in service:`,
        error.message
      );
      throw error;
    }
  }

  async updateEvent(id, dataToUpdate) {
    try {
      const updatedEvent = await EventModel.findByIdAndUpdate(
        id,
        dataToUpdate,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedEvent) {
        const error = new Error("Tour not found for update");
        error.status = 404;
        throw error;
      }

      return updatedEvent;
    } catch (error) {
      console.error(
        `Error updating tour with ID ${id} in service:`,
        error.message
      );
      throw error;
    }
  }

  async deleteEvent(id) {
    try {
      const result = await EventModel.findByIdAndDelete(id);

      if (!result) {
        const error = new Error("Tour not found for deletion");
        error.status = 404;
        throw error;
      }

      return "Deleted Successfully.";
    } catch (error) {
      console.error(
        `Error deleting tour with ID ${id} in service:`,
        error.message
      );
      throw error;
    }
  }
}

module.exports = new EventService();
