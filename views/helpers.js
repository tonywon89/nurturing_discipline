var dateFormat = require('dateformat');
var TaskActivity = require('../models/TaskActivity');
var async = require('async');

var calculateTimeRemaining = function(milestone) {

  let totalTimeCompleted = 0;

  milestone.task_activities.forEach(function(activity) {
    totalTimeCompleted += activity.timeAmount;
  })

  if (milestone.sub_milestones.length === 0) {
    return totalTimeCompleted;
  }

  milestone.sub_milestones.forEach(function(subMilestone) {
    totalTimeCompleted += calculateTimeRemaining(subMilestone);
  });

  return totalTimeCompleted;
}

module.exports = {
  date: function (value, object) {
    if (!value) {
      return null;
    }

    return dateFormat(value, 'mm-dd-yyyy');
  },

  goalRemaining: function (value, object) {
    const totalTimeCompleted = calculateTimeRemaining(object);

    return value - totalTimeCompleted;
  }
}
