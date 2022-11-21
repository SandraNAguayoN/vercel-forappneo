'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//////
var session = require('express-session');
var bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
//Fomato para fecha n minutos atrás
const { format } = require('timeago.js');

require("./config/passport")(passport);

var usersRouter = require('./routes/userRoutes');

const mongoose = require('mongoose');

var app = express();


//Conexión a la base de datos MongoDB
mongoose.connect("mongodb+srv://test:test@cluster0.32ht2.mongodb.net/forappneo?retryWrites=true&w=majority");
var db = mongoose.connection;
db.on('error', function (err) {
  console.log('connection error', err)
});
db.once('open', function () {
  console.log('Connection to DB successful')
});



//Configuración para las sesiones
app.use(session({ secret: 'secret', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

//Configuración de flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
// Configurando de Passport
var expressSession = require('express-session');
app.use(expressSession({ secret: 'mySecretKey' }));
app.use(passport.initialize());
app.use(passport.session());

//Configuración de BodyParser para manejo de datos en cuerpo de la solicitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Para el formato de fecha
// Global variables
app.use((req, res, next) => {
  app.locals.format = format;
  next();
});


app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
