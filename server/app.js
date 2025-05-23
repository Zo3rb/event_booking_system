const express = require("express");

// Local Importing
const { healthCheck, eventsRouter, usersRouter } = require("./routes");

// Creating an Instance of Express
const app = express();

// Built-in Middleware
app.use(express.json());

// App Routes
app.use("/health", healthCheck);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/users", usersRouter);

// Exporting Our App
module.exports = app;
