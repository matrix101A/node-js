const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    userId: req.user.id,
  })
    .then((result) => {
      res.redirect("/admin/products");
      //console.log(res);
    })
    .catch((e) => console.log(e));
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId).then((product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/add-product",
      editing: true,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res) => {
  prodId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .getProducts({ where: { id: prodId } })
    .then((product) => {
      product.title = title;
      product.description = description;
      product.imageUrl = imageUrl;
      product.price = parseInt(price);

      return product.save();
    })
    .then((result) => {
      console.log(" updated product");
      res.redirect("/admin/products");
    })
    .catch((e) => console.log(e));
};

exports.postDeleteProduct = (req, res) => {
  prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => product.destroy())
    .then((result) => {
      console.log("Destroyed product");
      res.redirect("/admin/products");
    })
    .catch((e) => console.log(e));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((e) => console.log(e));
};
