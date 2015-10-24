// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var Usuario = require('../models/usuario.js');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        nombre : 'nombre',
        apellidos : 'apellidos',
        empresa : 'empresa'
        rif : 'rif',
        direccion : 'direccion',
        codigo_postal : 'codigo_postal',
        poblacion : 'poblacion',
        provincia_estado : 'provincia_estado',
        pais : 'pais',
        telefono : 'telefono',
        fax : 'fax',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, nombre, apellidos, email, password, empresa, rif, direccion, codigo_postal, poblacion, provincia_estado, pais, telefono, fax, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Usuario.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', '¡Este email ya está registrado!'));
            } else {

                var u = req.body;

                // if there is no user with that email
                // create the user
               var nuevoUsuario = new Usuario({
                nombre : nombre,
                apellidos : apellidos,
                email : email,
                empresa : empresa,
                rif : rif,
                direccion : direccion,
                codigo_postal :.codigo_postal,
                poblacion : poblacion,
                provincia_estado :.provincia_estado,
                pais : pais,
                telefono : telefono,
                fax : fax,
                password :  nuevoUsuario.generarHash(password);
                esAdministrador : false
              });
                nuevoUsuario.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, nuevoUsuario);
                });
            }

        });    

        });

    }));

};