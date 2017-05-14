#! /usr/bin/env node

console.log('This script populates a some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
		console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
		return
}

var async = require('async')
var User = require('../models/User')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = [];

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


/** =============== Creating Convictions. ================ **/
var Conviction = require('../models/Conviction');
var convictions = [];

var convictionDetails = [
  {
    title: "Be a faithful servant of God",
    detailed_description: "Fullfill his promises to me that He 1) will find a wife for me who is my other half and 2) will make me as strong spiraitually as one punch man and 3) will make me wealthy to use the money to help the homeless",
    _user: mongoose.Types.ObjectId("590f4fb8d42c69c553af7f40")
  },
  {
    title: "Be a warrior of God, to bring his kingdom to Earth",
    detailed_description: "Show God's love to people through kindness and acceptance",
    _user: mongoose.Types.ObjectId("590f4fb8d42c69c553af7f40")
  },
  {
    title: "Help those who are struggling, and not leave a single person behind",
    detailed_description: "People are suffering, and as I love my neighbor, I don't want them to suffer. I want to help bring about the change",
    _user: mongoose.Types.ObjectId("590f4fb8d42c69c553af7f40")
  },
  {
    title: "I ned to earn more to support my mom living with me in San Francisco within a year",
    detailed_description: "She is my mom and one of the commandments is to honor my parents. I need to earn more to be able to afford living in San Francisco",
    _user: mongoose.Types.ObjectId("590f4fb8d42c69c553af7f40")
  },
];

convictionDetails.forEach(function(convictionDetail) {
  Conviction.create(convictionDetail, function(err, conviction) {
    if (err) {
      console.log(err);
      return;
    }
    convictions.push(conviction);
  });
});

mongoose.connection.close();
