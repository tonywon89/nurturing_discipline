var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MilestoneSchema = Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },

    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    date_added: { type: Date, default: Date.now },
    date_deleted: { type: Date, default: null }
  }
);

module.exports = mongoose.model('Milestone', MilestoneSchema);
