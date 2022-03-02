const jwt = require("jsonwebtoken");
const User = require("../models/user");
const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(404).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
const getTokenFrom = (request, response, next) => {
  const authorization = request.get("authorization"); //get token from header
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};
const userExtractor = async (request, response, next) => {
  if (request.token) {
    const id = await jwt.verify(request.token, process.env.SECRET).id;
    const user = await User.findById(id);
    request.user = user;
  }else{
      request.token=null;
  }
  next();
};
module.exports = {
  errorHandler,
  getTokenFrom,
  userExtractor,
};
