const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const mongoose = require("mongoose");
const mongoUrl = config.MONGODB_URI;
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const {
  getTokenFrom,
  userExtractor,
  errorHandler,
} = require("./utils/middleware");
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
app.use(cors());
app.use(express.json());
app.use(getTokenFrom);
app.use("/api/blogs", userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
if (process.env.NODE_ENV === "development") {
  const testRouter = require("./controllers/testing");
  app.use("/api/testing", testRouter);
}
app.use(errorHandler);
module.exports = app;
