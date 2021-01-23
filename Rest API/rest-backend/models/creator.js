const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Creator = sequelize.define(
  "creator",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: Sequelize.STRING, notNull: true },
  },
  {
    timestamps: false,
  }
);

module.exports = Creator;
