const fs = require("fs");
const path = require("path");
const { postDeleteProduct } = require("../controllers/admin");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);
module.exports = class cart {
  static addProduct(id, productPrice) {
    //fetch previous cart , if we already have product , increase quantity else add new one

    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (e) => {
        console.log(e);
      });
    });
  }
  constructor() {
    this.products = [];
    this.totalPrice = 0;
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        console.log(err, "from callback");
        cb(null);
      }
      console.log(cart);
      cb(cart);
    });
  }
  static deleteProduct(id, prodPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id == id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id != id
      );
      updatedCart.totalPrice = cart.totalPrice - productQty * prodPrice;
      fs.writeFile(p, JSON.stringify(updatedCart), (e) => {
        console.log(e);
      });
    });
  }
};
