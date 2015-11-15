var mongoose = require ('mongoose');
  var Schema = mongoose.Schema;

  // Objeto modelo de Mongoose
  var Producto= new Schema({

    codigo : Number,
    nombre : String, 
    stock : Number, 
    precio : Number,
    imagen :{
    	formato : String,
    	src : String,
    	path : String
    }

  });


module.exports = mongoose.model('Producto', Producto);
