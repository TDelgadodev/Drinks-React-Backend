require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
const cors = require('cors')

var indexRouter = require("./routes/index");

const connectDB = require('./config/db')
var app = express();

connectDB()

app
  .use(logger("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors())

app
  .use("/", indexRouter)
  .use(function (req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  // render the error page
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
  });
});

module.exports = app;
