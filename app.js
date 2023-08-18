var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dbConfig = require("./config/config.json");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var subscriptionRouter = require("./routes/subscription");
var deviceRouter = require("./routes/device");
var creditRouter = require("./routes/creditrecorditem");
var mongoose = require("mongoose");
var cors = require("cors");
var app = express();

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log(`
    -------------MONGO SERVER-------------------
    status:     listening
    message:    Marketplace Database Successfully connected to the database
    url:        ${dbConfig.url}
    --------------------------------------`);
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/subscription", subscriptionRouter);
app.use("/api/device", deviceRouter);
app.use("/api/credits", creditRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
