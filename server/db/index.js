const Sequelize = require('sequelize');
// const Campus = require("./models/campuses");

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boiler-plate', {
  logging: false // unless you like the logs
  // ...and there are many other options you may want to play with
});

module.exports = db;