var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },

    description: {
      type: String,
      trim: true,
      default: null,
    },

    _milestone: {
      type: Schema.Types.ObjectId,
      ref: 'Milestone',
      default: null,
    },

    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    selected: {
      type: Boolean,
      default: false
    },

    // In seconds
    currentTime: {
      type: Number,
      default: 0
    },

    date_added: { type: Date, default: Date.now },
    date_deleted: { type: Date, default: null }
  }
);

module.exports = mongoose.model('Task', TaskSchema);
