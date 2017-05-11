var express = require('express');
var router = express.Router();
var path = require('path');

// Home Page
router.get('/', function(req, res, next) {
  res.render('pug/index.pug', { title: "Nuturing Discipline"});
});

module.exports = router;
