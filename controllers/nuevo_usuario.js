var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario.js');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('usuarios/nuevo_usuario');
});



router.post('/', function(request, response) {

  var u = request.body;

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

  console.log("Agregando usuario");

  // también podía hacer `new db.User(u)`
  // porque los campos del formulario
  // tienen el mismo nombre del las
  // propiedades del modelo. Para
  // efectos demostrativos aquí cree
  // un objeto con las mismas propiedades
  // y les asigné los valores que vienen
  // del formulario.

  nuevoUsuario.save(function(error, usuarios) {

    if (error) response.json(error);

    response.redirect('login/nuevo_usuario');

  });

});

module.exports = router;
