var express = require('express');
var router = express.Router();

var convictions_controller = require('../../controllers/convictions_controller');

/* GET convictions listing. */
router.get('/', convictions_controller.conviction_list);
router.post('/', convictions_controller.conviction_create);
router.delete('/', convictions_controller.conviction_delete);
router.patch('/', convictions_controller.conviction_patch);

module.exports = router;
