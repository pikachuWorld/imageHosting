var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer  = require('multer');
var indexRouter = require('./routes/index');
var photos = require('./routes/photos');

var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('photos', path.join(__dirname, 'public/photos'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ dest: './tmp/'}).array('image'));
// app.use(multer({dest: app.get('photos')}).single('photo[image]'));
app.use(multer({dest: app.get('photos')}));

console.log(111, app.get('photos'))
app.get('/', photos.list);
app.get('/upload', photos.form);
app.post('/upload', photos.submit(app.get('photos')));


// app.post('/upload', photos.submit(app.get('photos')));
// app.get('/upload', photos.form);
// // app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/', photos.list);
// app.get('/upload', photos.form);
// app.post('/upload', photos.submit(app.get('photos')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
