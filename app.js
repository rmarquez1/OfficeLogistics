var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var logger = require('morgan');
var flash    = require('connect-flash');
var session      = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//var routes = require('./routes/index');
//var usuarios = require('./routes/usuarios');
var index = require('./controllers/index');
var admin = require('./controllers/admin');
var login = require('./controllers/login');
var logout = require('./controllers/logout');
var admin_productos = require('./controllers/admin_productos');
var productos = require('./controllers/productos');
var nuevo_usuario = require('./controllers/nuevo_usuario');

var app = express();

var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL  || 
  'mongodb://localhost/officelogistics_db';

// CONEXION A BASE DE DATOS
var mongoose = require('mongoose');
mongoose.connect(uristring, function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
   }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: path.join(__dirname, 'public/uploads')}))
app.use(cookieParser());
app.use(session({
  secret: 'ssshhhhh',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.get('/user/:user', function(req, res){
  req.session.name = req.params.user;
  res.send('<p>Session Set: <a href="/user">View Here</a></p>');
});

app.get('/user', function(req, res){
  console.log("Session name: "+ req.session.name);
  if(req.session.name)
   res.send(req.session.name+'<br /><a href="/logout">Logout</a>');
  else
   res.send('user logged out!');
});

/*app.get('/logout', function(req, res){
  req.session.destroy();
  res.send('<br />logged out!<br /><a href="/user">Check Session</a>');
});*/


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// passport config
var Usuario = require('./models/usuario');
/*passport.use(new LocalStrategy(Usuario.authenticate()));
passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());*/


//app.use('/', routes);
app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/admin_productos', admin_productos);
app.use('/admin', admin);
app.use('/productos', productos);
//app.use('/nuevo_usuario', nuevo_usuario);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
