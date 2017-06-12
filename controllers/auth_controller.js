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
      firstName: user.firstName,
      lastName: user.lastName
    },
    config.jwtSecret,
    {
      expiresIn: 60000
    }
  );

  // return Object.assign({}, user.toJSON(), { token: token });
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
  User.hashPassword(req.body.password).then(function (hashedPassword) {
    User.create(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword
    },

    function(err, user) {
      if (err) {
        res.json({ error: err });
      } else {
        res.render('json/user/user', {error: err, data: user })
      }
    }
  )
  });
}

exports.logout = function (req, res, next) {
  req.logout();
  res.clearCookie('userToken');
  res.json({ success: 1})
}

