var async = require('async');
var Milestone = require('../models/Milestone.js');

exports.milestone_list = function (req, res, next) {
  async.parallel({
    milestones: function(callback) {
      Milestone.find({ _user: req.user._id, date_deleted: null }, callback);
    }
  }, function(err, results) {
    res.render('json/milestone/milestones', { error: err, data: results})
  })
}

exports.milestone_create = function (req, res, next) {
  async.parallel({
    milestone: function(callback) {
      console.log(req.body);
      Milestone.create(
        {
          content: req.body.contentValue,
          _user: req.user._id
        }, callback);
    }
  }, function(err, results) {
    res.render('json/milestone/milestone', { error: err, data: results.milestone })
  });
}

