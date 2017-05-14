var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ConvictionSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      max: 140,
    },
    detailed_description: {
      type: String,
      trim: true,
      required: false,
    },
    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    date_added: { type: Date, default: Date.now }
  }
);

module.exports = mongoose.model('conviction', ConvictionSchema);


