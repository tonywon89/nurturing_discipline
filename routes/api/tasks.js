var express = require('express');
var router = express.Router();

var api_helpers = require('./api_helpers');
var tasks_controller = require('../../controllers/tasks_controller.js');

router.get('/', api_helpers.checkAuthenticated, tasks_controller.task_list);

router.post('/start_timer', api_helpers.checkAuthenticated, tasks_controller.start_timer)

router.get('/ping_task_timer', api_helpers.checkAuthenticated, tasks_controller.ping_task_timer);
module.exports = router;

router.post('/stop_task_timer', api_helpers.checkAuthenticated, tasks_controller.stop_task_timer);

router.post('/pause_task_timer', api_helpers.checkAuthenticated, tasks_controller.pause_task_timer);
