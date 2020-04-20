var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override')
var session = require('express-session')
var logger = require('morgan');
var bodyParser = require('body-parser');

var multer  = require('multer');
// var indexRouter = require('./routes/index');
var photos = require('./routes/photos');
var register = require('./routes/register');
var usersRouter = require('./routes/users');
var messages = require('./lib/messages');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('photos', path.join(__dirname, 'public/photos'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride())
app.use(cookieParser('you serect here'));
app.use(session())
app.use(messages)

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(multer({dest: app.get('photos')}));
// console.log('***111', photos)
app.get('/', photos.list);
app.get('/upload', photos.form);
app.post('/upload', photos.submit(app.get('photos')));
console.log('*****222', register)

app.get('/register', register.form);
app.post('/register', register.submit);
// // app.use('/', indexRouter);
app.use('/users', usersRouter); //用路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('-99--app.js--res.locals.message->', err)
  res.locals.message = err.message;
 
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
