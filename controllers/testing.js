const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
router.post("/reset", async (request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  response.status(204).end();
});
router.get("/healthcheck", (request, response) => {
    response.status(200).send("<h2>Healthy</h2>").end();
});
module.exports = router;
