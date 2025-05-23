const healthCheck = require("./healthCheck.route");
const eventsRouter = require("./events.route");
const usersRouter = require("./users.route");

module.exports = {
  healthCheck,
  eventsRouter,
  usersRouter,
};
