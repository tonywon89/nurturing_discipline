var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var expressValidator = require('express-validator');
var viewEngine = require('express-json-views');
var mongoose = require('mongoose');
var passport = require('passport');

/** Importing the different routes **/
var index = require('./routes/index');
var usersAPI = require('./routes/api/users');
var convictionsAPI = require('./routes/api/convictions');
var authenticationAPI = require('./routes/api/authentication');

var app = express();

var mongoUrl = 'mongodb://localhost:27017/growing_discipline';
mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.engine('json', viewEngine({
  helpers: require('./views/helpers')
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'json');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());


var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/User.js');
var jwt = require('jsonwebtoken');

app.use(passport.initialize());
app.use(passport.session());

var localStrategy = new LocalStrategy({
    usernameField: 'email',
  }, function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      user.isValidPassword(password, user.password).then(function(res) {
        if (res === false) {
          return done(null, false, { message: 'Incorrect password.' });

        }

        return done(null, user);
      });

      // // @TODO Add password handling
      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
    });
  }
);

passport.use(localStrategy);

// Routes
app.use('/', index);
app.use('/api/users', usersAPI);
app.use('/api/convictions', convictionsAPI);
app.use('/api/auth', authenticationAPI);

// app.use('/auth', authentication)

var User = require('./models/User.js');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pug/error.pug', { error: err });
});

module.exports = app;
