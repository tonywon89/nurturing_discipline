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

    /*
      goal:
      {
        goalType: ["timed" or "count"],
        goalTarget: 10000 (seconds or times),
        remaining: 9999,
      }
    */
    goal: {
      type: Schema.Types.Mixed
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

    date_added: { type: Date, default: Date.now },
    date_deleted: { type: Date, default: null }
  }
);

MilestoneSchema.plugin(mongooseAutopopulate);
module.exports = mongoose.model('Milestone', MilestoneSchema);
