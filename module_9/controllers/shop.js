const Product = require("../models/product");
const Cart = require("../models/cart");
const Order = require("../models/order");

const { connect } = require("../routes/shop");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Poroducts",
        path: "/products",
      });
    })
    .catch((e) => console.log(e));
};

exports.postCartDeleteProduct = (req, res) => {
  prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => res.redirect("/cart"))
    .catch((e) => console.log(e));
};

exports.postOrder = (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      console.log(cart, "this is cart");
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          order.addProducts(
            products.map((product) => {
              product.OrderItem = { quantity: 1 };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((e) => console.log(e));
};
exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((e) => console.log(e));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      console.log(cart);
      return cart.getProducts();
    })
    .then((products) => {
      console.log(products);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((e) => console.log(e));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQty = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      cart
        .getProducts({ where: { id: prodId } })
        .then((products) => {
          let product;
          if (products.length > 0) {
            product = products[0];
          }

          if (product) {
            const oldQty = product.cartItem.quantity;
            newQty = oldQty + 1;
            return product;
          }
          return Product.findByPk(prodId);
        })
        .then((product) => {
          return fetchedCart
            .addProduct(product, { through: { quantity: newQty } })

            .then((r) => res.redirect("/cart"))
            .catch((e) => console.log(e));
        });
    })
    .catch((e) => console.log(e));
  // console.log(prodId);
  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect("/");
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId) // find by primary key
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        path: "/product",
        pageTitle: product.title,
      });
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
