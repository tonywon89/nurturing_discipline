var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseAutopopulate = require("mongoose-autopopulate")

var MilestoneSchema = Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },

    // @TODO add this later when it is time to keep track of the different milestones
    // goalType: {
    //   type: String,
    //   enum: ['time', 'count']
    // }

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

    sub_milestones: [{ type: Schema.Types.ObjectId, ref: 'Milestone', autopopulate: true }],

    date_added: { type: Date, default: Date.now },
    date_deleted: { type: Date, default: null }
  }
);

MilestoneSchema.plugin(mongooseAutopopulate);
module.exports = mongoose.model('Milestone', MilestoneSchema);
