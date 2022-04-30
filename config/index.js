const path = require("path");
const env = require("dotenv");

env.config({ path: path.join(__dirname, "../../.env") });

const config = {
  db: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  app: {
    // name: process.env.APP_NAME,
    // domain: process.env.APP_DOMAIN,
    // logo: process.env.APP_LOGO,
    // isProduction: process.env.APP_ENV === "production",
    secret: process.env.JWT_SECRET,
    bcryptRounds: 10,
    port: process.env.PORT,
  },
};

module.exports = config;
