const { validationResult } = require("express-validator/check");
const Post = require("../models/post");
const Creator = require("../models/creator");

exports.getPosts = (req, res, next) => {
  Post.findAll()
    .then((posts) => {
      console.log(posts);
      res.status(200).json({ posts: posts });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

exports.getPost = (req, res, next) => {
  postId = req.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("cannot find post");
        error.statusCode(404);
        throw error;
      }
      console.log(post);
      res.status(200).json({ message: "Post fetched", post: post });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation failed, entered data is incorrect ");
    error.statusCode = 422;
    throw error; // equivalent to next()
  }
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db
  console.log(title, content);
  Post.create({ title: title, content: content, creatorId: 1 })
    .then((result) => {
      console.log(res);
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
  res.status(201).json({
    message: "Post created successfully!",
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: "Maximilian",
      },
      createdAt: new Date(),
    },
  });
};
