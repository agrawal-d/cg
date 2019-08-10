var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var config = require('./config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var passport = require("passport");
var app = express();
console.log("Starting app on", config.port);
console.log("Attempting to connect mongoose to", config.mongoString);
mongoose.connect(config.mongoString, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose DB connection error:'));
db.once('open', function () {
  console.log("Connection to DB establishd");
});
// app.use(session({
//   secret: 'get well soon',
//   resave: false,
//   saveUninitialized: true
// }))



// var session = require("express-session"),
bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(session({
  secret: "cats", resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
