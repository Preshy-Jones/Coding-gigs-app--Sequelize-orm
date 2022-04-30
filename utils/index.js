const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  generateJWTToken,
};

async function generateJWTToken(payload, secret = process.env.JWT_SECRET) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        ...payload,
      },
      secret,
      { expiresIn: "720h" },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
}
