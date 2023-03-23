var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');


var indexRouter = require('./routes/index');
const messagesRouter = require('./routes/messages');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to mongodb
mongoose.connect(process.env.MONGODB);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({secret: process.env.SECRET_COOKIE, resave: false, saveUninitialized: true}));

// Specify local strategy for passport
passport.use(
  new LocalStrategy(async(username, password, done) => {
    try {
      const user = await User.findOne({username: username});
      // username not valid
      if (!user) {
        return done(null, false, {message: 'Incorrect username'})
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log in
          return done(null, user)
        } else {
          // password not correct
          return done(null, false, {message: 'Incorrect password'});
        }
      });
    } catch (err) {
      return done(err);
    }
  })
)

// Save users
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});
// Initialize session and passport
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/messages', messagesRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
