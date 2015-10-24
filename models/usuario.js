var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var Schema = mongoose.Schema;

// Objeto modelo de Mongoose
var UsuarioSchema = new Schema({

  // Informacion personal
  nombre : String,
  apellidos : String,
  email : String, // Averiguar esto
  
  // Informacion de la Empresa
  empresa : String,

  // Dirreccion
  rif : String,
  direccion : String,
  codigo_postal : String,
  poblacion : String,
  provincia_estado : String,
  pais : String,  // Averiguar como colocar todos los paises

  // Contacto

  telefono : String,
  fax : String,

  // Contraseña
  password : String,

  // Booleano para permisologia de administrador
  esAdministrador : Boolean // tipo de dato buleano

});

// methods ======================
// Generando un hash
UsuarioSchema.methods.generarHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UsuarioSchema.methods.validarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UsuarioSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuario', UsuarioSchema);
