const Sequelize = require("sequelize");

const sequelize = new Sequelize("node", "root", "Abhinavabhinav1", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
