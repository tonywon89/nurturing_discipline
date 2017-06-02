var express = require('express');
var router = express.Router();
var convictions_controller = require('../../controllers/convictions_controller');

/* GET convictions listing. */

// @TODO: Refactor this code so that it can be used anywhere, perhaps a separate helper file.
function checkAuthenticated(req, res, next) {
  if (!req.user) {
    res.status(400).send("Not Authorized");

  } else {
    console.log(req.user);
    next();
  }

}

router.get('/', checkAuthenticated, convictions_controller.conviction_list);
router.post('/', convictions_controller.conviction_create);
router.delete('/', convictions_controller.conviction_delete);
router.patch('/', convictions_controller.conviction_patch);

module.exports = router;
