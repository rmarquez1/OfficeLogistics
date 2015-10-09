var express = require('express');
var router = express.Router();
var Producto = require('../models/producto.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Producto.find(function(req,resultado){
  		res.render('productos/index', { 
  			title: 'Lista de Productos',
  			resultado:resultado
  	});
  });
});

router.get('/nuevo_producto', function(request, response) {

  response.render('productos/nuevo_producto');

});

router.post('/nuevo_producto', function(request, response) {

  var u = request.body;

  // podemos acceder a DB sin hacer
  // require porque es global
  var nuevoProducto = new Producto({
  	codigo : u.codigo,
  	nombre : u.nombre,
  	stock : u.stock,
  	precio : u.precio

  });

  console.log("Estoy aqui");

  // también podía hacer `new db.User(u)`
  // porque los campos del formulario
  // tienen el mismo nombre del las
  // propiedades del modelo. Para
  // efectos demostrativos aquí cree
  // un objeto con las mismas propiedades
  // y les asigné los valores que vienen
  // del formulario.

  nuevoProducto.save(function(error, productos) {

    if (error) response.json(error);

    response.redirect('/productos');

  });

});

module.exports = router;
