var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var csrfProtection = csrf({ cookie: true });

router.get('/', csrfProtection, function(req, res) {
  res.json({ csrfToken: req.csrfToken() });
})

module.exports = router;
