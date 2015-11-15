var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario.js');
var flash    = require('connect-flash');
var passport = require('passport');

/*var session      = require('express-session');
router.use(session({
    secret: 'ssshhhhh',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));*/

router.get('/', function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('usuarios/login', { }); 
});


/*router.post('/login',function(req,res){
    sess = req.session;
    //In this we are assigning email to sess.email variable.
    //email comes from HTML page.
    sess.email=req.body.email;
    console.log("sesion: " + sess.email);

    //console.log("holaaa" + Usuario.buscarUsuario(sess.email, true));
    Usuario.find({"email":req.body.email ,"esAdministrador":true}, function(err, result){
        console.log("Resultado: ", result.length);
        if (result.length == 1){
            res.redirect('/admin');
        }else{
            res.redirect('/');
        }
    });
});*/

router.post('/login',function(req,res){
    req.session.name = req.body.email;
    Usuario.find({"email":req.body.email, "password":req.body.password, "esAdministrador":true}, function(err, result){
        console.log("Resultado: ", result.length);
        if (result.length == 1){
            res.redirect('/admin');
        }else{
            res.redirect('/');
        }
    });
});



// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
router.get('/nuevo_usuario', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('usuarios/nuevo_usuario', { });
});



// process the signup form
router.post('/nuevo_usuario', function(req, res) {
	var u = req.body;
	console.log("Hola1");

  // podemos acceder a DB sin hacer
  // require porque es global
	var nuevoUsuario = new Usuario({
		nombre : u.nombre,
		apellidos : u.apellidos,
		email : u.email,
		empresa : u.empresa,
		rif : u.rif,
		direccion : u.direccion,
		codigo_postal : u.codigo_postal,
		poblacion : u.poblacion,
		provincia_estado : u.provincia_estado,
		pais : u.pais,
		telefono : u.telefono,
		fax : u.fax,
		password : u.password,
		esAdministrador : false
	});
	console.log("Hola2");

    nuevoUsuario.save(function(err, usuario) {

    if (err) res.json(err);

        res.redirect('/login');

    });

    /* nuevoUsuario.save(function(err, usuario) {
    	console.log("Hola3");
        if (err) {
        	console.log("Hola4");
            return res.render('usuarios/nuevo_usuario', { info: "Sorry. That username already exists. Try again."});
        }
        console.log("Hola");
        
        console.log("Hola5");
    });
     passport.authenticate('local')(req, res, function () {
        	console.log("Hola adentro");
            res.redirect('/login');
        });*/
});

/*
// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
*/
module.exports = router;