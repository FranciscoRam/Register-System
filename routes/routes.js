var express = require('express');
var router = express.Router();
var controllers = require('.././controllers');
/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', controllers.HomeController.index);

//Rutas de usuario
router.get('/auth/signup', controllers.UserController.getSignUp);

module.exports = router;
