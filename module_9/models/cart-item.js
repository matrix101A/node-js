const sequelize = require("../util/database");

const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItem;
