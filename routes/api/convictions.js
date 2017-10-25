var express = require('express');
var router = express.Router();
var convictions_controller = require('../../controllers/convictions_controller');
var csrf = require('csurf');
var api_helpers = require('./api_helpers');

var csrfProtection = csrf({ cookie: true });

router.get('/', api_helpers.checkAuthenticated, convictions_controller.conviction_list);
router.post('/', api_helpers.checkAuthenticated, csrfProtection, convictions_controller.conviction_create);
router.delete('/', api_helpers.checkAuthenticated, convictions_controller.conviction_delete);
router.patch('/', api_helpers.checkAuthenticated, csrfProtection, convictions_controller.conviction_patch);

module.exports = router;
