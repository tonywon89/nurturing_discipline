var express = require('express');
var router = express.Router();


var user_controller = require('../controllers/user_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pug/index.pug', { title: 'Nuturing Discipline' });
});

router.get('/user/register', user_controller.user_register_get);

// /* POST request for creating user. */
// router.post('/user/register', user_controller.user_register_post);

// /* GET request to delete user. */
// router.get('/user/:userId/delete', user_controller.user_delete_get);

// // POST request to delete user
// router.post('/user/:userId/delete', user_controller.user_delete_post);

// /* GET request to update user. */
// router.get('/user/:userId/update', user_controller.user_update_get);

// // POST request to update user
// router.post('/user/:userId/update', user_controller.user_update_post);

// /* GET request for one user. */
// router.get('/user/:userId', user_controller.user_detail);

/* GET request for list of all Authors. */
router.get('/users', user_controller.user_list);

module.exports = router;
