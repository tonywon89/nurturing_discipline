#! /usr/bin/env node

console.log('This script populates a some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
		console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
		return
}

var async = require('async')
var User = require('../models/user')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []

function userCreate(first_name, last_name, email, date_added, callback) {
	userDetail = {first_name: first_name , last_name: last_name, email: email, date_added: date_added }

	var user = new User(userDetail);

	user.save(function (err) {
		if (err) {
			callback(err, null)
			return
		}
		console.log('New User: ' + user);
		users.push(user)
		callback(null, user)
	});
}

function createUsers(cb) {
	async.parallel([
		function(callback) {
			userCreate('Patrick', 'Rothfuss', 'p@rothfuss.com', '1992-04-06', callback);
		},
		function(callback) {
			userCreate('Ben', 'Bova', 'b@bova.com', '1992-04-07', callback);
		},
		function(callback) {
			userCreate('Isaac', 'Asimov', 'i@asimov.com', '1992-04-08', callback);
		},
		function(callback) {
			userCreate('Bob', 'Billings', 'b@Billings.com', '1992-04-09', callback);
		},
	], cb);
}


async.series([
		createUsers,
],
// optional callback
function(err, results) {
		if (err) {
				console.log('FINAL ERR: ' + err);
		}
		else {
			console.log('User Instances: ' + users);

		}
		//All done, disconnect from database
		mongoose.connection.close();
});
