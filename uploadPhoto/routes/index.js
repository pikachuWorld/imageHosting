var express = require('express');
var router = express.Router();
// var photos = require('./routes/photos');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('--->', req, res, next)
  res.render('index', { title: 'Express123'});
});

module.exports = router;
