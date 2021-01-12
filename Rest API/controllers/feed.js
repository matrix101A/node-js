exports.getPosts = (req, res) => {
  res.status(200).json({ name: "abhinav" });
};

exports.postPost = (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  res
    .status(201)
    .json({
      message: "post created sucessfully",
      post: { title: title, content: content },
    });
};
