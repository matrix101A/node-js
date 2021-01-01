const express = require("express");

const router = express.Router();
const rootDir = require("../util/path");

const path = require("path");
router.get("/", (req, res, next) => {
  //return response
  res.sendFile(path.join(rootDir, "views", "shop.html")); //sending a response
}); //another middleware

module.exports = router;
