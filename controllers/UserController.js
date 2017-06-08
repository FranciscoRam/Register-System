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
      password : password,
      typeuser: req.body.typeuser
    };

    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();

    db.query('INSERT INTO users SET ?', user, function(err, rows, fields){
      if(err) throw err;

      db.end();
    });
    
    req.flash('info', 'Se ha registrado correctamente, ya puede iniciar sesion');
    return res.redirect('/auth/signin');
  },
  getSignIn : function(req, res, next){
    return res.render('users/signin', {message: req.flash('info'), authmessage : req.flash('authmessage')});
  },

  logout : function(req, res, next){
    req.logout();
    res.redirect('/');
  },

  getUserPanel : function(req, res, next){
    res.render('users/panel', {
      isAuthenticated : req.isAuthenticated(),
      user : req.user
    });
  },

  getUserPerfil : function(req, res, next){
    res.render('users/perfil', {
      isAuthenticated : req.isAuthenticated(),
      user : req.user
    });
  },

  postPublication : function(req, res, next){
    /*
    salida varchar(255) not null,
  destino varchar(255) not null,
  hsalida varchar(255) not null,
  hdestino

    */
    var publication = {
      salida : req.body.salida,
      id_user : req.user.id,
      destino : req.body.destino,
      hsalida : req.body.hsalida,
      hdestino: req.body.hdestino
    };

    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();

    db.query('INSERT INTO publications SET ?', publication, function(err, rows, fields){
      if(err) throw err;

      db.end();
    });
    
   // req.flash('info', 'Se ha registrado correctamente, ya puede iniciar sesion');
    return console.log('Base de datos actualizada');
  }


};