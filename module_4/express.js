const http = require("http");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const express = require("express");
const parser = require("body-parser");

const path = require("path");
const rootDir = require("./util/path");
const app = express(); // acts as a request handler function

app.use(parser.urlencoded({ extended: false })); // parsing the body of request
app.use(express.static(path.join(rootDir, "public")));
app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});
//const server = http.createServer(app);
//server.listen(3000);
//or simply do
app.listen(3000);
