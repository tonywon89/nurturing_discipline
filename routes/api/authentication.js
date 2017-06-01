var express = require('express');
var router = express.Router();
var path = require('path');

var auth_controller = require("../../controllers/auth_controller");

router.post('/login' , auth_controller.login);

module.exports = router;
