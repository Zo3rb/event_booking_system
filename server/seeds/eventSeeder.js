const fs = require("fs");
const mongoose = require("mongoose");
const EventModel = require("../models/event.model");
const AppConfig = require("../config/AppConfig");

// DB Connection
const dbConnection = async () => {
  try {
    await mongoose.connect(AppConfig.DB_URI);
    console.log("[DATABASE] Successfully connected for seeding.");
  } catch (error) {
    console.error(`[DATABASE] Connection error: ${error}`);
    process.exit(1);
  }
};

const events = JSON.parse(
  fs.readFileSync(`${__dirname}/eventsSimple.json`, "utf-8")
);

// Import Data Into DB
const importData = async () => {
  try {
    await EventModel.create(events);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete All Data From DB
const deleteData = async () => {
  try {
    await EventModel.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const runSeeder = async () => {
  await dbConnection();

  if (process.argv[2] === "--import") {
    await importData();
  } else if (process.argv[2] === "--delete") {
    await deleteData();
  } else {
    console.log("Please specify an action: --import or --delete");
    process.exit();
  }
};

runSeeder();
