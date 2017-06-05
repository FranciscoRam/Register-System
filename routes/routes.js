var express = require('express');
var router = express.Router();
var controllers = require('.././controllers');
var passport = require('passport');
/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', controllers.HomeController.index);

//Rutas de usuario
router.get('/auth/signup', controllers.UserController.getSignUp);
router.post('/auth/signup', controllers.UserController.postSignUp);

router.get('/auth/signin', controllers.UserController.getSignIn);
router.post('/auth/signin', passport.authenticate('local', {
	successRedirect : '/',
	failureRedirect : '/auth/signin',
	failureFlash : true 
}));

module.exports = router;
