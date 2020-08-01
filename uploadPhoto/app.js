var createError = require('http-errors');
var express = require('express');
var csrf = require('csurf')
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
var user = require('./lib/middleware/user');
var messages = require('./lib/messages');
var login = require('./routes/login')
let User = require('./lib/user');
let validate = require('./lib/middleware/validate')
let page = require('./lib/middleware/page');
let Entry = require('./lib/entry')
let api = require('./routes/api') // new add
let entries = require('./routes/entries')
var app = express();

var csrfProtection = csrf({ cookie: true })
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('photos', path.join(__dirname, 'public/photos'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride())
app.use(cookieParser('you serect here'));
app.use(session({secret: 'anystringoftext', saveUninitialized: true, resave: true, httpOnly: true, secure: true}));
// app.use(session())
//  app.use(csrf());

// app.use('*', function (req, res, next) {
//   var token = req.csrfToken();
//   console.log('-###111222##token#####---', token)
//   res.cookie('XSRF-TOKEN', token);
//   res.locals.csrfToken = token;
//   next();
// });

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
// process.env.PORT
process.env.PORT = '3000'

// console.log( '*****', process.env, '***process---->', process.env.PORT)
// console.log('----api----', api, '---User.authenticate---', User.authenticate)
app.use('/api', function(req, res, next) {
  let auth;
 
  if (req.headers.authorization) {
    auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
  }

  //User.authenticate
  // if (!auth || auth[0] !== 'taotao') {
  if (!auth.length ) {
    User.authenticate(auth[0], auth[1], function(err, user){
      if(err) return next(err)
      if(user){
          // req.session.uid = user.id;
          // res.redirect('/upload');
      } else { 
          // res.error("Sorry! 无效的凭证。");
          // res.redirect('back');
          res.statusCode = 401;
          res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
          res.end('Unauthorized');
      }
  })
  } else {
      next();
  }
})

app.use(user)
app.use(messages)

app.use(multer({dest: app.get('photos')}));
// console.log('--222333----csrfProtection-----',  csrfProtection)

app.get('/list',  photos.list);
app.get('/listpdf',  photos.listpdf);
app.get('/upload',  photos.form);
app.post('/upload', photos.submit(app.get('photos')));
app.get('/photo/:id/download', photos.download(app.get('photos')))
app.get('/register', register.form);
app.post('/register',  register.submit);
//csrfProtection, 
app.get('/login',  login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);
//消息列表
//  console.log('***99999****', page)
app.get('/post', entries.form);
app.post('/post', validate.required('msgTitle'), validate.lengthAbove('msgTitle', 4), entries.submit);

app.get('/:page?', page(Entry.count, 5), entries.list)
// app.get('/',  entries.list)


// // app.use('/', indexRouter);
app.use('/users', usersRouter); //用路由
// 创建一个公开的REST API
app.get('/api/user/:id', api.user);
// app.get('/api/entries/:page?', api.entries);
// app.post('/api/entry', api.add)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //  console.log('----333err----->', err)
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  res.locals.message = err.message;
 
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
