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

module.exports = router;
