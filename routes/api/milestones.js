var express = require('express');
var router = express.Router();

var milestones_controller = require('../../controllers/milestones_controller');
var api_helpers = require('./api_helpers');

router.get('/', api_helpers.checkAuthenticated, milestones_controller.milestone_list);

router.post('/', api_helpers.checkAuthenticated, api_helpers.csrfProtection(), milestones_controller.milestone_create);

router.patch('/', api_helpers.checkAuthenticated, api_helpers.csrfProtection(), milestones_controller.milestone_patch)
module.exports = router;

router.delete('/', api_helpers.checkAuthenticated, api_helpers.csrfProtection(), milestones_controller.milestone_delete)

// Submilestones
router.post('/submilestones', api_helpers.checkAuthenticated, api_helpers.csrfProtection(), milestones_controller.sub_milestone_create);

// Tasks
router.post('/tasks', api_helpers.checkAuthenticated, api_helpers.csrfProtection(), milestones_controller.task_create)
router.delete('/tasks', api_helpers.checkAuthenticated, api_helpers.csrfProtection(), milestones_controller.task_delete)
