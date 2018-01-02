var async = require('async');
var Milestone = require('../models/Milestone.js');
var Task = require('../models/Task.js');


var mongoose = require('mongoose');

var getAllMilestones = function (req, res, next) {
  Milestone.find({ _user: req.user._id, _parent: null, date_deleted: null }).exec(function(err, milestones) {
      res.render('json/milestone/milestones', { error: err, data: { milestones: milestones }});
  });
}

exports.milestone_list = function (req, res, next) {
  getAllMilestones(req, res, next);
}

exports.milestone_create = function (req, res, next) {

  if (req.body.selectedOption === 'timed') {
    var hours = parseFloat(req.body.hours);
    var minutes = parseFloat(req.body.minutes);
  }

  Milestone.create({
    content: req.body.content,

    goalType: req.body.selectedOption,
    goalTarget: req.body.selectedOption === 'timed' ? (hours * 60 * 60 + minutes * 60) : Math.round(parseFloat(req.body.count)),
    goalRemaining: req.body.selectedOption === 'timed' ? (hours * 60 * 60 + minutes * 60) : Math.round(parseFloat(req.body.count)),

    _user: req.user._id
  }, function(err, milestone) {

    var task = new Task({
      _id: new mongoose.Types.ObjectId(),
      name: "General Task for \"" + milestone.content + "\"",
      _milestone: milestone._id,
      _user: req.user._id,
      selected: true,
    });

    task.save(function (err) {
      milestone.tasks.push(task._id);
      milestone.save(function (err) {

        getAllMilestones(req, res, next);
      })

    });
  });
}

exports.sub_milestone_create = function (req, res, next) {
  if (req.body.selectedOption === 'timed') {
    var hours = parseFloat(req.body.hours);
    var minutes = parseFloat(req.body.minutes);
  }

  var subMilestone = new Milestone({
    _id: new mongoose.Types.ObjectId(),
    content: req.body.content,
    _parent: req.body.parentMilestone,
    _user: req.user._id,

    goalType: req.body.selectedOption,
    goalTarget: req.body.selectedOption === 'timed' ? (hours * 60 * 60 + minutes * 60) : Math.round(parseFloat(req.body.count)),
    goalRemaining: req.body.selectedOption === 'timed' ? (hours * 60 * 60 + minutes * 60) : Math.round(parseFloat(req.body.count)),

  });

  subMilestone.save(function(err) {

     var task = new Task({
      _id: new mongoose.Types.ObjectId(),
      name: "General Task for \"" + subMilestone.content + "\"",
      _milestone: subMilestone._id,
      _user: req.user._id,
    });

    task.save(function (err) {
      subMilestone.tasks.push(task._id);
      subMilestone.save(function (err) {

        Milestone.findByIdAndUpdate(
          req.body.parentMilestone,
          {$push: { sub_milestones: subMilestone._id}},
          function(err, milestone) {
            getAllMilestones(req, res, next);
          }
        );
      });
    });
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
  Milestone.findByIdAndUpdate(req.body.id, { date_deleted: new Date() }).exec(function(err, milestone) {

    // Mark tasks as deleted so that it doesn't show up in the workstation
    recursivelyDeleteTasksAndSubMilestones(milestone);

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
  });
}

function recursivelyDeleteTasksAndSubMilestones(milestone) {
  Task.update({_milestone: milestone._id}, { date_deleted: new Date() }, function (err, tasks) {

    Milestone.update({ _parent: milestone._id}, { date_deleted: new Date() }, function (err, milestones) {

      if (milestone.sub_milestones.length === 0) {
        return;
      }

      Milestone.populate(milestone, {path: 'sub_milestones', model: 'Milestone' }, function(err, milestone) {
          milestone.sub_milestones.forEach(function(subMilestone) {
            recursivelyDeleteTasksAndSubMilestones(subMilestone);
          });
      });
    })
  });
}


exports.task_create = function (req, res, next) {
  var task = new Task({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    _milestone: req.body.milestoneId,
    _user: req.user._id,
  });

  task.save(function(err) {
    Milestone.findByIdAndUpdate(
      req.body.milestoneId,
      {
        $push: { tasks: task._id},
        expanded: true,
      },
      function(err, milestone) {
        getAllMilestones(req, res, next);
      }
    );
  });
}

exports.task_delete = function (req, res, next) {
  Task.findByIdAndUpdate(req.body.id, { date_deleted: new Date() }, function (err, task) {
    Milestone.findOne({ _id: task._milestone }, function (err, milestone) {
      if (milestone) {
        milestone.tasks.remove(task._id);

        milestone.save(function(err) {
          getAllMilestones(req, res, next);
        })
      } else {
        getAllMilestones(req, res, next);
      }
    });
  });
}

exports.task_patch = function (req, res, next) {
  Task.findByIdAndUpdate(req.body.id, { name: req.body.name, selected: (req.body.selected === 'true' ? true : false) }, function(err, task) {
    getAllMilestones(req, res, next);
  });
}

