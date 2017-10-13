var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt');

var UserSchema = Schema(
	{
		firstName: {
			type: String,
			trim: true,
			max: 100,
		},
		lastName: {
			type: String,
			max: 100,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
			required: 'Email address is required',
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
		},
    username: {
      type: String,
      trim: true,
      unique: true,
      required: 'Username is required',
      max: 50,
    },
    password: {
      type: String,
      trim: true,
      required: 'Password is required'
    },
		dateAdded: { type: Date, default: Date.now },
	}
);

UserSchema.virtual('name').get(function () {
	return this.lastName + ', ' + this.firstName;
});

var saltRounds = 10;

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, saltRounds)
}

UserSchema.statics.isValidPassword = function (password, hash) {
  return bcrypt.compare(password, hash)
};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
