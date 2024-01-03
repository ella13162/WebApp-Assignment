const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'explorelocal.db' // Path to your SQLite database
});

module.exports = sequelize;
