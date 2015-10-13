module.exports = function(mongoose) {

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

  // metodo para calcular la edad a partir de la fecha de nacimiento
  UserSchema.methods.age = function() {

    return ~~((Date.now() - this.birthdate) / (31557600000));

  }

  return mongoose.model('Usuario', UsuarioSchema);
}