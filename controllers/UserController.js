var mysql = require('mysql');

module.exports = {
	getSignUp : function(req, res, next){
		return res.render('users/signup');
	}
};