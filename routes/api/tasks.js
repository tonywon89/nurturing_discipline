var express = require('express');
var router = express.Router();

var api_helpers = require('./api_helpers');
var tasks_controller = require('../../controllers/tasks_controller.js');

router.get('/', api_helpers.checkAuthenticated, tasks_controller.task_list);


// Timer routes
router.post('/start_timer', api_helpers.checkAuthenticated, tasks_controller.start_timer)

router.get('/ping_task_timer', api_helpers.checkAuthenticated, tasks_controller.ping_task_timer);
module.exports = router;

router.patch('/stop_task_timer', api_helpers.checkAuthenticated, tasks_controller.stop_task_timer);

router.patch('/pause_task_timer', api_helpers.checkAuthenticated, tasks_controller.pause_task_timer);

router.patch('/resume_Task_timer', api_helpers.checkAuthenticated, tasks_controller.resume_task_timer);

// Task Activities
router.get('/task_activities', api_helpers.checkAuthenticated, tasks_controller.task_activities_list);
