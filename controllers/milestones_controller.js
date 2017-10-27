var async = require('async');
var Milestone = require('../models/Milestone.js');
var mongoose = require('mongoose');

exports.milestone_list = function (req, res, next) {
  Milestone.find({ _user: req.user._id, _parent: null, date_deleted: null }).populate({path:'sub_milestones',
    populate: { path: 'sub_milestones' }
  }).exec(function(err, results) {

    res.render('json/milestone/milestones', { error: err, data: { milestones: results }})
  });
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

exports.sub_milestone_create = function (req, res, next) {
  // console.log(req.body['parentMilestone']);
  var subMilestone = new Milestone({
    _id: new mongoose.Types.ObjectId(),
    content: req.body.subMilestoneContent,
    _parent: req.body.parentMilestone,
    _user: req.user._id
  });

  subMilestone.save(function(err) {
    // res.render('json/milestone/milestone', { error: err, data: subMilestone})
      Milestone.findByIdAndUpdate(
        req.body.parentMilestone,
        {$push: { sub_milestones: subMilestone._id}},
        {safe: true, upsert: true, new : true},
        function(err, milestone) {
          res.render('json/milestone/milestone', { error: err, data: milestone})
    });
  })
}

