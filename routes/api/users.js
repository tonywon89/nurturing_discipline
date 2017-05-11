var express = require('express');
var router = express.Router();

var users_controller = require('../../controllers/users_controller');

/* GET users listing. */
router.get('/', users_controller.user_list);

module.exports = router;
