var async = require('async');
var Conviction = require('../models/Conviction');


exports.conviction_list = function (req, res, next) {
  async.parallel({
    convictions: function(callback) {
      Conviction.find({}, callback);
    },
  }, function(err, results) {
      res.render('json/conviction/convictions', { error: err, data: results });
  });
}


