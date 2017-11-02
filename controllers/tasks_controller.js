var Task = require('../models/Task.js');

exports.task_list = function (req, res, next) {
  Task.find({ _user: req.user._id, date_deleted: null }).exec(function (err, results) {
    res.render('json/milestone/tasks', { error: err, data: { tasks: results }});
  });
}
