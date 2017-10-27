var async = require('async');
var Conviction = require('../models/Conviction');


exports.conviction_list = function (req, res, next) {
  async.parallel({
    convictions: function(callback) {
      Conviction.find({ _user: req.user._id, date_deleted: null }, callback);
    },
  }, function(err, results) {
      res.render('json/conviction/convictions', { error: err, data: results });
  });
}

exports.conviction_create = function (req, res, next) {
  async.parallel({
    conviction: function(callback) {
      Conviction.create(
        {
          title: req.body.title,
          detailed_description: req.body.detailed_description,
          _user: req.user._id
        }, callback);
    }
  }, function(err, results) {
      res.render('json/conviction/conviction', { error: err, data: results.conviction });
  });
}

exports.conviction_delete = function (req, res, next) {
  Conviction.findByIdAndUpdate({ _id: req.body.convictionId }, { date_deleted: new Date() }, function(err, conviction) {
    if (err) return;

    // Send the convictionId to be removed form the store in the frontend
    res.json({ convictionId: req.body.convictionId });
  })
}

exports.conviction_patch = function (req, res, next) {
  Conviction.findByIdAndUpdate(
    req.body.id,
    {title: req.body.title, detailed_description: req.body.detailed_description },
    { new: true },
    function(err, conviction) {
      res.render('json/conviction/conviction', { error: err, data: conviction });
    }
  );
}


