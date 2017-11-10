var Task = require('../models/Task.js');

exports.task_list = function (req, res, next) {
  Task.find({ _user: req.user._id, date_deleted: null }).exec(function (err, results) {
    Task.findOne({ _user: req.user._id, date_deleted: null, active: true}).exec(function(err, task) {
      res.render('json/milestone/tasks', { error: err, data: { tasks: results, selectedTask: task }});
    })
  });
}
