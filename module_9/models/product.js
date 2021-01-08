const Cart = require("./cart");

const db = require("../util/database");
const getProductsFromFile = () => {};

module.exports = class Product {
  constructor(title, imageUrl, description, price, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save() {}

  static deleteById(id) {}

  static fetchAll(cb) {
    db.execute("SELECT * FROM products ");
  }

  static findById(id, cb) {}
};
