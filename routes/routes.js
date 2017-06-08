var express = require('express');
var router = express.Router();
var controllers = require('.././controllers');
var passport = require('passport');
var AuthMiddleware = require('.././middleware/auth');
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
	successRedirect : '/auth/panel',
	failureRedirect : '/auth/signin',
	failureFlash : true 
}));

router.post('/auth/signin', passport.authenticate('local', {
	successRedirect : '/auth/perfil',
	failureRedirect : '/auth/signin',
	failureFlash : true 
}));


router.get('/auth/logout', controllers.UserController.logout);
router.get('/auth/panel', AuthMiddleware.isLogged, controllers.UserController.getUserPanel)
router.get('/auth/perfil', AuthMiddleware.isLogged, controllers.UserController.getUserPerfil)

module.exports = router;
