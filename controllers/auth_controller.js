var async = require('async');
var User = require('../models/User.js');
var passport = require('passport');


exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    // @TODO: Add error handling here
    res.render('json/user/user', { error: err, data: user });
  })(req, res, next);
};
