var express = require('express');
var router = express.Router();
var Producto = require('../models/producto.js');
var fs = require('fs');
var path =require('path');
var multer  = require('multer');

var base64 = require('base-64');

//var base64 = require('node-base64-image');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}



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
  //console.log(path.parse(u.imagen));
  //var imagen_formato = u.imagen.substring(u.imagen.length - 4);
 /* console.log(u.imagen.length);
  console.log(imagen_formato);*/
  //var imagen = u.imagen;
  var ruta = u.imagen;
  console.log(request.files);
  console.log(request.files.imagen.path);
  /*var imagen_src = new Buffer(u.imagen).toString('base64');
  var iamgen_normal = imagen_src.toString('ascii');*/
  var imagen_src = base64.encode(u.imagen);
  var imagen_normal = base64.decode(imagen_src);
  /*console.log(imagen_src);
  console.log(iamgen_normal);*/

  var base64_file = new Buffer(request.files.imagen.originalname).toString('base64');
  console.log(base64_file);

  // podemos acceder a DB sin hacer
  // require porque es global
  var nuevoProducto = new Producto({
  	codigo : u.codigo,
  	nombre : u.nombre,
  	stock : u.stock,
  	precio : u.precio,
    imagen : {
      formato : request.files.imagen.extension,
      src : request.files.imagen.name,
      path : request.files.imagen.path
    }

  });

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
