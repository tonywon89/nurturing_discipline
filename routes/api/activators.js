var express = require('express');
var router = express.Router();

var activators_controller = require('../../controllers/activators_controller');

/* GET activators listing. */
router.get('/', activators_controller.activator_list);

module.exports = router;
