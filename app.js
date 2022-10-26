const createError = require("http-errors");
const express = require("express");
const bodyParser = require('body-parser');
const expressSession = require('express-session');
require("dotenv").config();
const passportSetting = require('./modules/passport/passport');
//Third Party middlewares
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require('passport')
const cookieSession = require('cookie-session');
const mongoose = require("mongoose");

//router
const indexRouter = require("./routes");
const { authRouter, imageRouter, eventRouter,userRouter } = indexRouter;

//express-app
const app = express();

// DB connection
// mongoose.connect(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    console.log("something went wrong");
  } else {
    console.log("mongodb connected");
  }
});
mongoose.connection.on("connect", () => {
  console.log("mongoDB connected");
});

let whiteList = ['http://localhost:5173','https://event-automation.vercel.app','http://event-automation.vercel.app']
let corsOptions = {
  origin: whiteList,
  // origin:'*',
  credentials: true,

}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false, // 빈 값도 저장
    secret: 'asdvfkvfe', // cookie 암호화 키. dotenv 라이브러리로 감춤
    cookie: {
      httpOnly: false,
      secure: false, // https 프로토콜만 허락하는 지 여부
      maxAge:1000 * 60 * 60
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
passportSetting();
app.use("/auth", authRouter);
app.use("/images", imageRouter);
app.use("/event", eventRouter);
app.use("/user", userRouter)


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

});
module.exports = app;
