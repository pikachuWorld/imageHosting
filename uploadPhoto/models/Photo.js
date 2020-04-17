var mongoose = require('mongoose');
 mongoose.connect('mongodb://127.0.0.1/photo_app');
var schema = new mongoose.Schema({
     name: String,
     path: String
});
module.exports = mongoose.model('Photo', schema);