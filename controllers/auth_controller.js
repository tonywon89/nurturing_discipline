var async = require('async');
var User = require('../models/User.js');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/jwt_config.js');
var crypto = require('crypto');
var sendGridConfig = require('../config/send_grid_config.js');
var nodemailer = require('nodemailer');
var _ = require('lodash');

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
    } else {
      res.json({ notLoggedIn: true })
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
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });


  // Looks for existing email or username. If there is no unique, it will save the username and log in.
  User.find({ $or: [{ email: user.email }, { username: user.username }] }, function (err, users) {
    if (err) {
      return next(err);
    } else if (users.length > 0) {
      if (_.find(users, { email: user.email })){
        return res.json({ error: 1, message: "Email is already taken" });
      }

      else if (_.find(users, { username: user.username })) {
        return res.json({ error: 1, message: "Username is already taken" });
      }
    } else {
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
  });
}

exports.logout = function (req, res, next) {
  req.logout();
  res.clearCookie('userToken');
  res.json({ success: 1})
}

exports.emailForgotAuthInfo = function (req, res, next) {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      })
    },

    function (token, done) {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) {
          return res.json({ error: 1, errorMessage: "No User user with that email has been found" });
        }

        var expirationTime = Date.now() + 3600000; // 1 hour

        if (req.body.forgotPassword === 'true') {
          user.resetPasswordToken = token;
          user.resetPasswordExpires = expirationTime;
        }

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },

    function (token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: sendGridConfig.sendGrid.username,
          pass: sendGridConfig.sendGrid.password,
        }
      });

      var forgotPasswordMessage = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/#/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'

        var forgotUsernameMessage = 'Your username is ' + user.username +'.\n\n';

      var mailOptions = {
        to: user.email,
        from: 'home@nurturingdiscipline.com',
        subject: 'Login Credentials: Nurturing Discipline',
        text: (req.body.forgotUsername === 'true' ? forgotUsernameMessage : "") + (req.body.forgotPassword === 'true' ? forgotPasswordMessage : "")
      };
      var err = null;
      smtpTransport.sendMail(mailOptions, function(err) {
        done(err, user);
      });
    }
  ], function(err, user) {
    if (err) return next(err);

    res.json({ success: 1, email: user.email });

  })
}

exports.resetPassword = function (req, res, next) {
  async.waterfall([
    function (done) {
      User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {

        if (!user) {
          return res.json({error: 1, errorMessage: "Password reset token is invalid or has expired"});
        }

        user.password = req.body.newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function (err) {
          if (err) {
            res.json({ error: err });
          } else {
            done(err, user);
          }
        });
      });

    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: sendGridConfig.sendGrid.username,
          pass: sendGridConfig.sendGrid.password,
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'home@nurturingdiscipline.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      var err = null;
      smtpTransport.sendMail(mailOptions, function(err) {
        done(err, user);
      });
    }

  ], function(err, user) {
    if (err) return next(err);
    // @TODO render the user template json
    res.render('json/user/user', { error: err, data: user });
  })
}

exports.checkValidToken = function (req, res, next) {
  User.findOne({ resetPasswordToken: req.query.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {

      if (!user) {
        return res.json({ error: 1, errorMessage: "Password reset token is invalid or has expired"});
      }

      return res.json({ success: 1} )
  });
}
