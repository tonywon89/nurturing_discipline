var express = require('express');
var router = express.Router();
var convictions_controller = require('../../controllers/convictions_controller');
var csrf = require('csurf');

/* GET convictions listing. */

// @TODO: Refactor this code so that it can be used anywhere, perhaps a separate helper file.
function checkAuthenticated(req, res, next) {
  if (!req.user) {
    res.status(400).send("Not Authorized");
  } else {
    next();
  }
}

var csrfProtection = csrf({ cookie: true });

router.get('/', checkAuthenticated, convictions_controller.conviction_list);
router.post('/', checkAuthenticated, csrfProtection, convictions_controller.conviction_create);
router.delete('/', checkAuthenticated, convictions_controller.conviction_delete);
router.patch('/', checkAuthenticated, csrfProtection, convictions_controller.conviction_patch);

module.exports = router;
