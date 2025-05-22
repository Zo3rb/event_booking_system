const healthCheck = require("./healthCheck.route");
const toursRouter = require("./tours.route");
const usersRouter = require("./users.route");

module.exports = {
  healthCheck,
  toursRouter,
  usersRouter,
};
