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

  getUserPerfil : function(req, res, next){
    //Pide la configuracion de la base de datos
    var config = require('.././database/config');

    //Crea la conexion y la conecta
    var db = mysql.createConnection(config);
    db.connect();
    
    console.log(req.user.id);
    //hace una busqueda en la base de datos de todas las publicaciones que hay
    db.query('SELECT * FROM publications WHERE id_user = ?', req.user.id,function(err, results){
      if (err) throw err

      var salida=[];
      var destino=[];
      var hsalida=[];
      var hdestino=[];
      var id_user=[];
      //var publication=results[9];
      for(i=0;i<results.length;i++){
        console.log(results[i].salida);
        salida[i]=results[i].salida;
        destino[i]=results[i].destino;
        hsalida[i]=results[i].hsalida;
        hdestino[i]=results[i].hdestino;
        id_user[i]=results[i].id_user;
      }
      var publication={
          salida : salida,
          destino : destino,
          hdestino : hdestino,
          hsalida : hsalida,
          id_user : id_user
        }
      db.end();
      res.render('users/perfil', {
      isAuthenticated : req.isAuthenticated(),
      user : req.user,
      publication : publication
      });
    });
  },

  postPublication : function(req, res, next){
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
    return res.redirect('/auth/panel');
  },

  getUserPanel : function(req, res, next){
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();
    db.query('SELECT * FROM publications', function(err, results){
      if (err) throw err

      var salida=[];
      var destino=[];
      var hsalida=[];
      var hdestino=[];
      var id_user=[];
      //var publication=results[9];
      for(i=0;i<results.length;i++){
        console.log(results[i].salida);
        salida[i]=results[i].salida;
        destino[i]=results[i].destino;
        hsalida[i]=results[i].hsalida;
        hdestino[i]=results[i].hdestino;
        id_user[i]=results[i].id_user;
      }
      var publication={
          salida : salida,
          destino : destino,
          hdestino : hdestino,
          hsalida : hsalida,
          id_user : id_user
        }
      db.end();
      res.render('users/panel', {
      isAuthenticated : req.isAuthenticated(),
      user : req.user,
      publication : publication
      });
    });
  }
/*
  ,

  getPublication : function(req, res, next){
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect(function(err){
      if (err) throw err

      res,render('users/panel', console.log("No hubo fallos"));
    });
  }
*/
};