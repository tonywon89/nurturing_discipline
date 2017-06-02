var async = require('async');
var User = require('../models/User.js');
var passport = require('passport');


exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    // @TODO: Improve the error handling here in the future
    if (err) {
      res.json({ error: err });
    } else if (info) {
      res.json(info);
    } else {
      res.render('json/user/user', { error: err, data: user });
    }
  })(req, res, next);
};

exports.register = function (req, res, next) {
  User.hashPassword(req.body.password).then(function (hashedPassword) {
    User.create(
    {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
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
