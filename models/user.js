var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
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
    resetPasswordToken: String,
    resetPasswordExpires: Date
	}
);


UserSchema.pre('save', function (next) {
  const SALTROUNDS = 10;  // or another integer in that ballpark
  const user = this;
  if(!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALTROUNDS, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) { return next(error); }

      user.password = hash;
      next();
    });
  });
});

UserSchema.virtual('name').get(function () {
	return this.lastName + ', ' + this.firstName;
});

UserSchema.statics.isValidPassword = function (password, hash) {
  return bcrypt.compare(password, hash)
};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
