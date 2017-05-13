var async = require('async');
var Driver = require('../models/user.js');

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
