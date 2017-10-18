var async = require('async');
var User = require('../models/User.js');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/jwt_config.js');

function addJWT(user) {
  var token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    config.jwtSecret,
    {
      expiresIn: 60000
    }
  );

  return token;
}

exports.login = function (req, res, next) {
  if (req.body.initialLoad === 'true') {
    if (req.cookies.userToken) {
      var decodedUser = jwt.verify(req.cookies.userToken, config.jwtSecret);
      req.logIn(decodedUser, function (err) {
        res.render('json/user/user', { error: err, data: decodedUser });
      });
    }
  } else {

    passport.authenticate('local', function (err, user, info) {
      // @TODO: Improve the error handling here in the future
      if (err) {
        res.json({ error: err });
      } else if (info) {
        res.json(info);
      } else {
        req.logIn(user, function (err) {
          var token = addJWT(user);
          // @TODO: Once sending over https, make sure { secure: true }
          res.cookie('userToken', token, { httpOnly: true });
          res.render('json/user/user', { error: err, data: user });
        });
      }
    })(req, res, next);
  }
};

exports.register = function (req, res, next) {
  var user =  new User(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

  // There is a presave method in the user.js mongoose model schema, so it does not save the actual password.
  user.save(function(err) {
    if (err) {
      res.json({ error: err });
    } else {
      req.logIn(user, function (err) {
        var token = addJWT(user);
        // @TODO: Once sending over https, need to add { secure: true }
        res.cookie('userToken', token, { httpOnly: true });
        res.render('json/user/user', { error: err, data: user });
      });
    }
  });
}

exports.logout = function (req, res, next) {
  req.logout();
  res.clearCookie('userToken');
  res.json({ success: 1})
}

