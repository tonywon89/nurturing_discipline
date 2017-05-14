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

exports.conviction_list = function (req, res, next) {
  async.parralel({
    convictions: function(callback) {
      conviction.find({}, callback);
    }, function (err, results) {
      res.render('json/convictions', { error: err, data: results});
    }
  });
}


