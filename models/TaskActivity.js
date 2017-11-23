var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskActivitySchema = Schema(
  {
    _task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      default: null,
    },

    timeAmount: {
      type: Number,
      default: 0
    },

    running: {
      type: Boolean,
      default: false
    },

    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    date_added: { type: Date, default: Date.now },
    date_ended: { type: Date, default: null},
    date_deleted: { type: Date, default: null },

  }
)

module.exports = mongoose.model('TaskActivity', TaskActivitySchema);
