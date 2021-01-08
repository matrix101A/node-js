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

  save() {
    return db.execute(
      "INSERT INTO products (title,price,imageUrl,description) VALUES(?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {}

  static fetchAll(cb) {
    return db.execute("SELECT * FROM products ");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products where products.id = ?", [id]);
  }
};
