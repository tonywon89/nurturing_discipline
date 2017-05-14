var express = require('express');
var router = express.Router();

var convictions_controller = require('../../controllers/convictions_controller');

/* GET convictions listing. */
router.get('/', convictions_controller.conviction_list);

module.exports = router;
