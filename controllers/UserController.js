var mysql = require('mysql');
var bcrypt = require('bcryptjs')

module.exports = {
	getSignUp : function(req, res, next){
		return res.render('users/signup');
	},
	postSignUp : function(req, res, next){

		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(req.body.password, salt);

		var user = {
			email : req.body.email,
			nombre : req.body.nombre,
			password : password
		};

		var config = require('.././database/config');

		var db = mysql.createConnection(config);

		db.connect();

		db.query('INSERT INTO users SET ?', user, function(err, rows, fields){
			if(err) throw err;

			db.end();
		});
		
		return res.redirect('/auth/signin');
	},
	getSignIn : function(req, res, next){
		return res.render('users/signin');
	}
};