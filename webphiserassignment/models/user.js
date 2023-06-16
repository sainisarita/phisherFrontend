const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
   
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING
  },
  about: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  }
});
// Sync the database


module.exports = {
  User
}
