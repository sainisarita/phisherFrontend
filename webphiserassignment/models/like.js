const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const Like = sequelize.define('like', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  toUserId: {
    type: DataTypes.INTEGER
  },
  likeStatus: {
    type: DataTypes.BOOLEAN
  }
 
});
// Sync the database


module.exports = {
  Like
}
