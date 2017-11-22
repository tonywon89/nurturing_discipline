var Task = require('../models/Task.js');

var intervalIds = {};

exports.task_list = function (req, res, next) {
  Task.find({ _user: req.user._id, date_deleted: null }).exec(function (err, results) {
    Task.findOne({ _user: req.user._id, date_deleted: null, selected: true}).exec(function(err, task) {
      res.render('json/milestone/tasks', { error: err, data: { tasks: results, selectedTask: task }});
    })
  });
}

exports.start_timer = function(req, res, next) {

  Task.findById(req.body['selectedTask[id]']).exec(function(err, task) {
      var intervalId = setInterval(function() {
        task.currentTime += 1;
        task.save();
      }, 1000);

      intervalIds['interval' + task._id] = intervalId;
      task.save();
      res.json({ task: task });
  })
}

exports.ping_task_timer = function (req, res, next) {
  Task.findById(req.query.selectedTask._id).exec(function(err, task) {
    // clearInterval(intervalIds['interval' + task._id]);
    res.json({ task: task });
  });
};

