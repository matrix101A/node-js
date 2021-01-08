const path = require("path");

const sequelize = require("./util/database");

const express = require("express");
const bodyParser = require("body-parser");
const Product = require("./models/product");
const User = require("./models/user");

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

User.hasMany(Product);

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { getMaxListeners } = require("process");

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
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
