var express = require('express');
var router = express.Router();

var milestones_controller = require('../../controllers/milestones_controller');
var csrf = require('csurf');
var api_helpers = require('./api_helpers');

var csrfProtection = csrf({ cookie: true });

router.get('/', api_helpers.checkAuthenticated, milestones_controller.milestone_list);

router.post('/', api_helpers.checkAuthenticated, csrfProtection, milestones_controller.milestone_create);

// Submilestones

router.post('/submilestones', api_helpers.checkAuthenticated, csrfProtection, milestones_controller.sub_milestone_create);

module.exports = router;
