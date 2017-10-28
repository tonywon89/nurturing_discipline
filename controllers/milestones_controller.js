var async = require('async');
var Milestone = require('../models/Milestone.js');
var mongoose = require('mongoose');

var getAllMilestones = function (req, res, next) {
  Milestone.find({ _user: req.user._id, _parent: null, date_deleted: null }).exec(function(err, results) {
      res.render('json/milestone/milestones', { error: err, data: { milestones: results }});
  });
}

exports.milestone_list = function (req, res, next) {
  getAllMilestones(req, res, next);
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
  var subMilestone = new Milestone({
    _id: new mongoose.Types.ObjectId(),
    content: req.body.subMilestoneContent,
    _parent: req.body.parentMilestone,
    _user: req.user._id
  });

  subMilestone.save(function(err) {
    Milestone.findByIdAndUpdate(
      req.body.parentMilestone,
      {$push: { sub_milestones: subMilestone._id}},

      function(err, milestone) {
        getAllMilestones(req, res, next);
      }
    );
  });
}

exports.milestone_patch = function (req, res, next) {
  Milestone.findByIdAndUpdate(
    req.body.id,
    {content: req.body.content, expanded: req.body.expanded },
    function(err, milestone) {
      getAllMilestones(req, res, next);
    }
  )
}

exports.milestone_delete = function (req, res, next) {
  Milestone.findByIdAndUpdate(req.body.id, { date_deleted: new Date() }, function(err, milestone) {

    Milestone.findOne({ _id: milestone._parent}, function(err, parentMilestone) {

      if (parentMilestone) {
        parentMilestone.sub_milestones.remove(milestone._id);

        parentMilestone.save(function(err) {
          getAllMilestones(req, res, next);
        })
      } else {
        getAllMilestones(req, res, next);
      }

    })
  })


}
