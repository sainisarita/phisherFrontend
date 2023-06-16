const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const Post = sequelize.define('post', {
  image: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.INTEGER
  }
});
// Sync the database


module.exports = {
  Post
}
