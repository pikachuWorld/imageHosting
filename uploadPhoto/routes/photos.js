// var Photo = require('../models/Photo')
// var path = require('path')
// var fs = require('fs')
// var join = path.join;


var photos= [];
photos.push({
    name: 'Node.js Logo',
    path:  'https://storage.360buyimg.com/mtd/home/111543234387022.jpg'
})
photos.push({
    name: 'Ryan Speaking',
    path:  'https://storage.360buyimg.com/mtd/home/221543234387016.jpg'
})
exports.list = function(req, res){
    res.render('photos', {
        title: '**Photos**',
        photos: photos
    })
}
// exports.form = function(req, res){
//     res.render('photos/upload', {
//         title: 'Photos upload'
//     })
// }
// exports.submit = function(dir){
//    return function(req, res, next){
//         var img = req.files.photo.image;
//         var name = req.body.photo.name || img.name;
//         var path = join(dir, img.name);
//         fs.rename(img.path, path, function(err){
//             if(err) return next(err);
//             Photo.create({
//                 name: name,
//                 path: img.name
//             }, function(err){
//                 if(err) return next(err);
//                 res.redirect('/')
//             });
//         });
//    };
// };
