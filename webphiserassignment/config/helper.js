const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {

  encryptPassword: async (password) => {
    const generateSalt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, generateSalt);
  },
  comparePassword: async (password, hash) => {
    return await bcrypt.compare(password, hash);
  },

  createJwtToken: (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },
};
