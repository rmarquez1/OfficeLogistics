var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
	// render the page and pass in any flash data if it exists
	if (req.session.name){
		res.render('usuarios/admin', { }); 
	} else{
		console.log("user logged out!");
		res.send('user logged out!');
	}
	
});

module.exports = router;