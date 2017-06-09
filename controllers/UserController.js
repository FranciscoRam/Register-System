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
    
    console.log('Tipo de usuario es= '+req.user.typeuser);
    //Un IF ya que el perfil contiene informacion diferente dependiendo del tipo de usuario, usa diferentes tablas
    if(req.user.typeuser=='Conductor'){
    //hace una busqueda en la base de datos de todas las publicaciones que hay
        db.query('SELECT * FROM publications WHERE id_user = ?', req.user.id,function(err, results){
          if (err) throw err
      //    db.query('SELECT * FROM subsraids WHERE id_user = ?', req.user.id,function(err, subsresults){

          var salida=[];
          var destino=[];
          var hsalida=[];
          var hdestino=[];
          var id_user=[];
          //var publication=results[9];
          for(i=0;i<results.length;i++){
            //console.log(results[i].salida);
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


      //    });//Final del query de subraids

        });//FInal del query de publications
     }if(req.user.typeuser=='Pasajero'){

      db.query('SELECT * FROM subsraids WHERE id_user = ?', req.user.id,function(err, results){
          if (err) throw err

          var pas_salida=[];
          var pas_destino=[];
          var pas_hsalida=[];
          var pas_hdestino=[];
          var id_user=[];
          var id_pub=[];


          for(i=0;i<results.length;i++){
            console.log(results[i].pas_salida);
            pas_salida[i]=results[i].pas_salida;
            pas_destino[i]=results[i].pas_destino;
            pas_hsalida[i]=results[i].pas_hsalida;
            pas_hdestino[i]=results[i].pas_hdestino;
            id_user[i]=results[i].id_user;
            id_pub[i]=results.id_pub;
          }
          var subsraid={
              pas_salida : pas_salida,
              pas_destino : pas_destino,
              pas_hdestino : pas_hdestino,
              pas_hsalida : pas_hsalida,
              id_user : id_user,
              id_pub : id_pub
            }
          db.end();
          res.render('users/perfil', {
          isAuthenticated : req.isAuthenticated(),
          user : req.user,
          subsraid : subsraid
          });

      });
     }
  },

  postPublication : function(req, res, next){
    var publication = {
      salida : req.body.salida,
      id_user : req.user.id,
      destino : req.body.destino,
      hsalida : req.body.hsalida,
      hdestino: req.body.hdestino
    };

    var num_del=req.body.delete;

    //Verificacion sobre los valores de las variables dentro dle cuerpo
    
      //console.log('MIREN TODOS SOY NULL= '+num_del);

    //estableciendo la conexion a la base de datos
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();

    if(num_del!=''){

      if(req.user.typeuser=='Conductor'){
            db.query('SELECT * FROM publications WHERE id_user = ?', req.user.id, function(err,results){
              num_del=num_del-1;
              var id_pub=results[num_del].id;
              //ELIMINANDO DATO de la DB
              db.query('DELETE FROM publications WHERE id = ?', id_pub);

              //console.log('id Publicacion= '+id_pub);
              db.end();
          });
      }
      if (req.user.typeuser=='Pasajero') {

        db.query('SELECT * FROM subsraids WHERE id_user = ?', req.user.id, function(err,results){
              num_del=num_del-1;
              var id_pub=results[num_del].id;
              //ELIMINANDO DATO de la DB
              db.query('DELETE FROM subsraids WHERE id = ?', id_pub);

              //console.log('id Publicacion= '+id_pub);
              db.end();
          });

      }


      return res.redirect('/auth/perfil');

    }else{
    db.query('INSERT INTO publications SET ?', publication, function(err, rows, fields){
      if(err) throw err;

      db.end();
    });
    return res.redirect('/auth/panel');
    }
   // req.flash('info', 'Se ha registrado correctamente, ya puede iniciar sesion');
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
        //console.log(results[i].salida);
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
  },

  postUserPanel : function(req, res, next){
    var id_agregar = req.body.agregar;

    console.log('ID de lo que se agregara= ' + id_agregar);

    //Estableciendo la conexion con la Base de datos
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();

    //HACIENDO LA CONSULTA
    db.query('SELECT * FROM publications', function(err, results){
      if (err) throw err

      console.log('Se agregara: '+ results[id_agregar-1].id);

      var subsraids = {
        pas_salida : results[id_agregar-1].salida,
        id_user : req.user.id,
        pas_destino : results[id_agregar-1].destino,
        pas_hsalida : results[id_agregar-1].hsalida,
        pas_hdestino : results[id_agregar-1].hdestino,
        id_pub : results[id_agregar-1].id
      };

      /*
      pas_salida varchar(255) not null,
  pas_destino varchar(255) not null,
  pas_hsalida varchar(255) not null,
  pas_hdestino varchar(255) not null,
  id_users int not null,
  id_pub int not null
      */

      db.query('INSERT INTO subsraids SET ?', subsraids, function(err, rows, fields){
        if (err) throw err

        db.end();
      });

    });

    return res.redirect('/auth/perfil');
  }


};