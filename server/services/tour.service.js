const TourModel = require("../models/tour.model");

class TourService {
  async createTour(tourData) {
    try {
      const newTour = await TourModel.create(tourData);

      return newTour;
    } catch (error) {
      console.error("Error creating tour in service:", error.message);
      throw error;
    }
  }

  async listTours() {
    try {
      const tours = await TourModel.find({});

      return tours;
    } catch (error) {
      console.error("Error listing tours in service:", error.message);
      throw error;
    }
  }

  async readOneTour(id) {
    try {
      const tour = await TourModel.findById(id);

      if (!tour) {
        const error = new Error("Tour not found");
        error.status = 404;
        throw error;
      }

      return tour;
    } catch (error) {
      console.error(
        `Error reading tour with ID ${id} in service:`,
        error.message
      );
      throw error;
    }
  }

  async updateTour(id, dataToUpdate) {
    try {
      const updatedTour = await TourModel.findByIdAndUpdate(id, dataToUpdate, {
        new: true,
        runValidators: true,
      });

      if (!updatedTour) {
        const error = new Error("Tour not found for update");
        error.status = 404;
        throw error;
      }

      return updatedTour;
    } catch (error) {
      console.error(
        `Error updating tour with ID ${id} in service:`,
        error.message
      );
      throw error;
    }
  }

  async deleteTour(id) {
    try {
      const result = await TourModel.findByIdAndDelete(id);

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

module.exports = new TourService();
