var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseAutopopulate = require("mongoose-autopopulate")
var Task = require('./Task.js');

var MilestoneSchema = Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },

    goalType: {
      type: String,
    },

    goalTarget: {
      type: Number,
    },

    goalRemaining: {
      type: Number
    },

    expanded: {
      type: Boolean,
      default: false,
    },

    _parent: {
      type: Schema.Types.ObjectId,
      ref: 'Milestone',
      default: null
    },

    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    sub_milestones: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Milestone',
        // Fills in the sub milestones/landmarks
        autopopulate: true
      }
    ],

    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        autopopulate: true,
      }
    ],

    task_activities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'TaskActivity',
        autopopulate: true,
      }
    ],

    date_added: { type: Date, default: Date.now },
    date_deleted: { type: Date, default: null }
  }
);

MilestoneSchema.plugin(mongooseAutopopulate);
module.exports = mongoose.model('Milestone', MilestoneSchema);
