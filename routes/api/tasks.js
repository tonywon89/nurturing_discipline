var express = require('express');
var router = express.Router();

var api_helpers = require('./api_helpers');
var tasks_controller = require('../../controllers/tasks_controller.js');

router.get('/', api_helpers.checkAuthenticated, tasks_controller.task_list);

module.exports = router;

