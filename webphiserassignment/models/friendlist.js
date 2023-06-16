'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friendList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      friendList.belongsTo(models.User, { foreignKey: 'userId' });
      friendList.belongsTo(models.User, { foreignKey: 'toUserId' });
    }
  }
  friendList.init({
    acceptStatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'friendList',
  });
  
  return friendList;
};