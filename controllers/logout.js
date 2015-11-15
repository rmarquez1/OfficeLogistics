var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  req.session.destroy();
  //res.send('<br />logged out!<br /><a href="/user">Check Session</a>');
  res.redirect('/');
});

module.exports = router;