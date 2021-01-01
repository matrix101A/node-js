const express = require("express");

const router = express.Router();
const path = require("path");

const rootDir = require("../util/path");

router.get("/add-product", (req, res, next) => {
  console.log("IN another product ");
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
  // next() allows request to continue to next middleware
}); //add a new middleware

router.post("/add-product", (req, res) => {
  //handles post request
  console.log(req.body);
  res.redirect("/");
});
module.exports = router;
