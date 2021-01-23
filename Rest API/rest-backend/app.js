const express = require("express");
const bodyParser = require("body-parser");

const Sequelize = require("sequelize");
const sequelize = require("./utils/database");

const Post = require("./models/post");
const Creator = require("./models/creator");

const feedRoutes = require("./routes/feed");

const app = express();

const path = require("path");

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use("/images", express.static(path.join(__dirname, "images"))); //serving images as static

Post.belongsTo(Creator);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

sequelize
  .sync() // syncs to my sql localhost

  .then((res) => {
    console.log("success");
    app.listen(8080);
  })
  .catch((err) => console.log(err));
