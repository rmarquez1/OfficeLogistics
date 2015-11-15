var express = require('express');
var router = express.Router();
var Producto = require('../models/producto.js');

router.get('/', function(req, res, next) {
    
    Producto.find(function(req,resultado){
        res.render('productos/productos', { 
         title: 'Lista de Productos',
         resultado:resultado,
      });
    });
});


module.exports = router;
