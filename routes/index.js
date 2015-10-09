var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tareas', function(req, res, next) {

    res.render('tareas/index', { 
      title: 'Vista index lista de tareas'
	});
  
});

module.exports = router;