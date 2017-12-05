var Task = require('../models/Task.js');
var TaskActivity = require('../models/TaskActivity.js');
var Milestone = require('../models/Milestone.js')

var intervalIds = {};

exports.task_list = function (req, res, next) {
  Task.find({ _user: req.user._id, date_deleted: null }).populate('_milestone', 'content').exec(function (err, results) {
    Task.findOne({ _user: req.user._id, date_deleted: null, selected: true}).populate('_milestone', 'content').exec(function(err, task) {
      res.render('json/milestone/tasks', { error: err, data: { tasks: results, selectedTask: task }});
    })
  });
}

exports.start_timer = function(req, res, next) {
  Task.findById(req.body['selectedTask[id]']).exec(function (err, task) {
    TaskActivity.create({
      _task: task._id,
      _user: task._user,
      _milestone: task._milestone,
      running: true,
    }, function (err, taskActivity) {
      Milestone.findById(task._milestone).exec(function(err, milestone) {
        milestone.task_activities.push(taskActivity._id);
        milestone.save();
        var intervalId = setInterval(function() {
          taskActivity.timeAmount += 1;
          taskActivity.save();
          console.log(taskActivity.timeAmount);
        }, 1000);
        intervalIds['interval' + taskActivity._id] = intervalId;

        res.json({ task: task, taskActivity: taskActivity });
      })
    });
  })
}

exports.ping_task_timer = function (req, res, next) {
  TaskActivity.findOne({ _user: req.user._id, date_ended: null }).exec(function (err, taskActivity) {
    if (taskActivity && !taskActivity.running) {
      res.json({ taskActivity: taskActivity });
    } else {
      if (taskActivity && !intervalIds['interval' + taskActivity._id]) {
        var intervalId = setInterval(function() {
          taskActivity.timeAmount += 1;
          taskActivity.save();
          console.log(taskActivity.timeAmount);
        }, 1000);

        intervalIds['interval' + taskActivity._id] = intervalId;
        res.json({ taskActivity: taskActivity });
      };
    }

  });
};

exports.stop_task_timer = function (req, res, next) {
  TaskActivity.findById(req.body['taskActivity[_id]']).exec(function (err, taskActivity) {
    taskActivity.running = false;
    taskActivity.date_ended = new Date();
    taskActivity.save();

    clearInterval(intervalIds['interval' + taskActivity._id]);
    res.json({ taskActivity: taskActivity})
  })
}

exports.pause_task_timer = function (req, res, next) {
  TaskActivity.findById(req.body['taskActivity[_id]']).exec(function (err, taskActivity) {
    taskActivity.running = false;
    taskActivity.save();
    clearInterval(intervalIds['interval' + taskActivity._id]);
    res.json({ taskActivity: taskActivity });
  });
}

exports.resume_task_timer = function (req, res, next) {
  TaskActivity.findById(req.body['taskActivity[_id]']).exec(function (err, taskActivity) {
    taskActivity.running = true;
    taskActivity.save();
    var intervalId = setInterval(function() {
      taskActivity.timeAmount += 1;
      taskActivity.save();
      console.log(taskActivity.timeAmount);
    }, 1000);

    intervalIds['interval' + taskActivity._id] = intervalId;
    res.json({ taskActivity: taskActivity });
  });
}

// Task Activities actions

exports.fetch_task_activities = function (req, res, next) {
  TaskActivity.find({_user: req.user._id, date_ended: { $ne: null } }).populate('_milestone', 'content').populate('_task', 'name').exec(function(err, taskActivities) {
    res.json({taskActivities: taskActivities})
  })
}
