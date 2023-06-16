const  Sequelize = require('sequelize');

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('database_development', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
});
module.exports = {sequelize}