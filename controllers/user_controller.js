var async = require('async');
var User = require('../models/user.js');

exports.user_list = function (req, res, next) {
	async.parallel({
		users: function(callback) {
			User.find({}, callback);
		},
		}, function(err, results) {
				// res.render('user/users', { title: 'All users', error: err, data: results });
				// res.json(results)
        res.render('json/users', { error: err, data: results });
		});
}

exports.user_detail = function(req, res, next) {
	res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
}

// Display Author create form on GET
exports.user_register_get = function(req, res, next) {
		res.render('user/user_register', { title: 'Register User' });
};

// Handle User create on POST
exports.user_register_post = function(req, res, next) {
	req.checkBody('first_name', 'First Name Required').notEmpty();

	req.sanitize('first_name').escape();
	req.sanitize('first_name').trim();

	var errors = req.validationErrors();

	var user = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email
	});

	if (errors) {
		res.render('pug/user/user_register', { 'title': 'Register', 'errors': errors });
		return;
	} else {
		user.save(function (err) {
			if (err) return next(err);
			res.redirect('../users');
		})
	}
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
