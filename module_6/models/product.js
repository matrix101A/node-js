const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (e, fileContent) => {
    if (e) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (e) => {
        console.log(e);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
