const http = require("node:http");

// Local Importing
const AppConfig = require("./config/AppConfig");
const app = require("./app");
const dbConnection = require("./utils/dbConnection");

// Creating HTTP Server
const server = http.createServer(app);

// Starting Server
const PORT = AppConfig.PORT || 5000;
server.listen(PORT, () => {
  console.log(`[SERVER] Application is UP & Running on PORT: ${PORT}`);
  dbConnection();
});
