var async = require('async');
var User = require('../models/user.js');

exports.user_list = function (req, res, next) {
	async.parallel({
    users: function(callback) {
      var users = User.find({}, callback);
    },
    }, function(err, results) {
        res.render('users', { title: 'All users', error: err, data: results });
    });
}

exports.user_detail = function(req, res, next) {
	res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
}

// Display Author create form on GET
exports.user_create_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: User create GET');
};

// Handle User create on POST
exports.user_create_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: User create POST');
};

// Display User delete form on GET
exports.user_delete_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: User delete GET');
};

// Handle User delete on POST
exports.user_delete_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: User delete POST');
};

// Display User update form on GET
exports.user_update_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST
exports.user_update_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: User update POST');
};
