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

exports.conviction_create = function (req, res, next) {
  async.parallel({
    conviction: function(callback) {
      Conviction.create({ title: req.body.conviction_title }, callback);
    }
  }, function(err, results) {
      res.render('json/conviction/conviction', { error: err, data: results.conviction });
  });
}


