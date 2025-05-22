const tourService = require("../services/tour.service");

const createTour = async (req, res) => {
  try {
    const tourData = req.body;

    if (!tourData.name || !tourData.description) {
      return res.status(400).json({
        status: "fail",
        message: "Name and description are required fields.",
      });
    }

    const newTour = await tourService.createTour(tourData);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
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

const listTours = async (req, res) => {
  try {
    const tours = await tourService.listTours();

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
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

const getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await tourService.readOneTour(id);

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        tour,
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

const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;

    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "No data provided for update.",
      });
    }

    const updatedTour = await tourService.updateTour(id, dataToUpdate);

    if (!updatedTour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found or no changes made.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        tour: updatedTour,
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

const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTour = await tourService.deleteTour(id);

    if (!deletedTour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found.",
      });
    }

    res.status(204).json({
      status: "success",
      message: deletedTour,
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
  createTour,
  listTours,
  getTourById,
  updateTour,
  deleteTour,
};
