const createError = require("http-errors");
const express = require("express");
const formidableMiddleware = require('express-formidable');
const bodyParser = require('body-parser');
require("dotenv").config();

//Third Party middlewares
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// const passport = require('passport');
// const passportSettingRouter = require('./passport/index');
// mongoose
const mongoose = require("mongoose");

//router
const indexRouter = require("./routes");
const { authRouter, imageRouter, eventRouter } = indexRouter;

//express-app
const app = express();

// DB connection
// mongoose.connect(process.env.MONGODB_URI)
mongoose.connect("mongodb://localhost:27017/event-auto", (err) => {
  if (err) {
    console.log("something went wrong");
  } else {
    console.log("mongodb connected");
  }
});
mongoose.connection.on("connect", () => {
  console.log("mongoDB connected");
});
console.log(process.env.MONGODB_URI);
const corsOptions = {
  origin: "*",
  preflightContinue: false,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(passport.initialize());
// passportSettingRouter();

app.use("/auth", authRouter);
app.use("/images", imageRouter);
app.use("/event", eventRouter);
// app.use('/products',productRouter);
// app.use('/posts',postRouter);
// app.use('/images',imageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});

app.listen(8080, () => {
  console.log("serverOpen");
});
module.exports = app;
