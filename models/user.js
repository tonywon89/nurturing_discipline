var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt');

var UserSchema = Schema(
	{
		first_name: {
			type: String,
			trim: true,
			required: true,
			max: 100,
		},
		last_name: {
			type: String,
			required: true,
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
    password: {
      type: String,
      trim: true,
      required: 'Password is required'
    },
		date_added: { type: Date, default: Date.now },
	}
);

UserSchema.virtual('name').get(function () {
	return this.last_name + ', ' + this.first_name;
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
