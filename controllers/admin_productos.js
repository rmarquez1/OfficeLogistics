var express = require('express');
var router = express.Router();
var Producto = require('../models/producto.js');
var fs = require('fs');
var path =require('path');
var multer  = require('multer');

/* GET users listing. */
router.get('/', function(req, res, next) {
    
  if (req.session.name){
    Producto.find(function(req,resultado){
        res.render('productos/admin_productos', { 
         title: 'Lista de Productos',
         resultado:resultado,
      });
    });
  }else{
    res.send('user logged out!');
  }
  
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
  //var imagen_src = base64.encode(u.imagen);
 // var imagen_normal = base64.decode(imagen_src);
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

    response.redirect('/admin_productos');

  });

});

router.get('/eliminar_producto', function(req, res) {
  res.render("productos/eliminar_producto");
});

router.post('/eliminar_producto', function(req, res) {
  Producto.remove({codigo:req.body.codigo}, function(err, result){
        if (err) res.json(err)
        else res.redirect("/admin_productos")
    });
});


module.exports = router;
