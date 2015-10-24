var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario.js');
var flash    = require('connect-flash');
var passport = require('passport');

router.get('/', function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('usuarios/login', { }); 
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

     Usuario.register(new Usuario({ email : req.body.email }), req.body.password, function(err, usuario) {
    	console.log("Hola3");
        if (err) {
        	console.log("Hola4");
            return res.render('usuarios/nuevo_usuario', { info: "Sorry. That username already exists. Try again."});
        }
        console.log("Hola");
        passport.authenticate('local')(req, res, function () {
        	console.log("Hola adentro");
            res.redirect('/');
        });
        console.log("Hola5");
    });
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