const dotenv = require("dotenv");
const config = require("../config");
const { Sequelize } = require("sequelize");

dotenv.config();
module.exports = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: "mysql",
  }
);
