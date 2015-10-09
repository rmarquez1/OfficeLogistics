
var mongoose = require ('mongoose');
  var Schema = mongoose.Schema;

  // Objeto modelo de Mongoose
  var Producto= new Schema({

    codigo : Number,
    nombre : String, 
    Stock : String, 
    precio : String

  });



  module.exports = mongoose.model('Producto', Producto);
