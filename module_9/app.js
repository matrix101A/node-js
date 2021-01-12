const path = require("path");

const sequelize = require("./util/database");

const express = require("express");
const bodyParser = require("body-parser");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-items");

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

Product.belongsToMany(Cart, { through: CartItem });

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      console.log(user);
      req.user = user;
      next();
    })
    .catch((e) => console.log(e));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
  .sync() // syncs to my sql localhost
  .then((res) => {
    return User.findByPk(1);
    //console.log(res);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Abhinav",
        email: "tiwariabhinavin@gmail.com",
      });
    }
    return user;
  })
  .then((user) => {})
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
