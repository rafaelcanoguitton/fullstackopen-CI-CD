const userRouter = require("express").Router();
const User = require("../models/user");
const Blog=require("../models/blog");
const bcrypt = require("bcrypt");

require("express-async-errors");
const uniqueValidator=require('mongoose-unique-validator');
userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});
userRouter.post("/", async (request, response) => {
    const body=request.body;
  if (!(body.username && body.password)) {
    return response.status(400).end();
  }
  if(body.password.length<3){
    return response.status(400).json({error:'Password must be at least 3 characters long.'});
  }
  const hashedPswd = await bcrypt.hash(body.password, 10);
  const user = new User({
    username: request.body.username,
    passwordHash: hashedPswd,
  });
  const result= await user.save();
  response.json(result);
});
module.exports=userRouter;