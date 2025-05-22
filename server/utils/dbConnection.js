const mongoose = require("mongoose");

// Local Importing
const AppConfig = require("../config/AppConfig");

// Creating the Database connection function
const dbConnection = async function () {
  try {
    console.info("[DATABASE] Attempting to connect to the Database.");
    await mongoose.connect(AppConfig.DB_URI);
    console.info("[DATABASE] Successfully connected.");
  } catch (error) {
    console.error(`
            Error occurred when trying to connect to the Database.
            [ERROR]: ${error}
            `);
  }
};

module.exports = dbConnection;
