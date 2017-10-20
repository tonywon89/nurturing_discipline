var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

var auth_controller = require("../../controllers/auth_controller");

router.post('/login', auth_controller.login);
router.post('/register', auth_controller.register);
router.post('/logout', auth_controller.logout);
router.post('/emailForgotAuthInfo', auth_controller.emailForgotAuthInfo);
router.post('/resetpassword', auth_controller.resetPassword);

router.get('/checkValidToken', auth_controller.checkValidToken);
module.exports = router;
