var mongoose = require('mongoose');
 mongoose.connect('mongodb://49.232.92.12/photo_app');
var schema = new mongoose.Schema({
     name: String,
     path: String
});
module.exports = mongoose.model('Photo', schema);