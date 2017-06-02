var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

var auth_controller = require("../../controllers/auth_controller");

router.post('/login', passport.authenticate('local'), auth_controller.login);
router.post('/register', auth_controller.register);

router.post('/logout', auth_controller.logout);

module.exports = router;
