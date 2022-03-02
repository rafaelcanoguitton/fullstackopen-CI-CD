const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("express-async-errors");
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).end();
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!(request.token && decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blogToSave = request.body;
  const fromUser = request.user;
  blogToSave.user = fromUser._id;
  const blog = new Blog(blogToSave);
  const result = await blog.save();
  fromUser.blogs = fromUser.blogs.concat(blog._id);
  fromUser.save();
  response.status(201).json(result);
});
blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!(request.token && decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blog = await Blog.findByIdAndRemove(id);
  if (blog.user.toString() === decodedToken.id.toString()) {
    return response.status(204).end();
  }
  return response
    .status(401)
    .json({ error: "that blog doesn't belong to you :)" });
});
blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const la_update = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };
  const result = await Blog.findByIdAndUpdate(id, la_update, { new: true });
  console.log("resultadito", result);
  response.json(result);
});
module.exports = blogRouter;
