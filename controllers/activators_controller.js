var async = require('async');
var Activator = require('../models/Activator');

// exports.user_list = function (req, res, next) {
//   async.parallel(
//   {
//     users: function(callback) {
//       User.find({}, callback);
//     },
//   }, function(err, results) {
//       res.render('json/users', { error: err, data: results });
//   });
// }

exports.activator_list = function (req, res, next) {
  async.parralel({
    activators: function(callback) {
      activator.find({}, callback);
    }, function (err, results) {
      res.render('json/activators', { error: err, data: results});
    }
  });
}


