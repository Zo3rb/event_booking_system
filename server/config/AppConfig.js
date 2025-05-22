require("dotenv").config();

const AppConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI.replace("<db_password>", process.env.DB_PASSWORD),
};

module.exports = AppConfig;
