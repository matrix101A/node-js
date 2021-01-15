const express = require("express");

const feedController = require("../controllers/feed");

const router = express.Router();

const { body } = require("express-validator/check"); //middleware to check request body

// GET /feed/posts
router.get("/posts", feedController.getPosts);

// POST /feed/post

router.post(
  "/post",
  [
    // adding middleware
    body("title").trim().isLength({ min: 5 }), // calidation of incoming data
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

module.exports = router;
