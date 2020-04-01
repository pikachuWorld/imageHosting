
var Photo = require('../models/Photo')
var path = require('path')
var fs = require('fs')
var join = path.join;

// var photos= [];
// photos.push({
//     name: 'Node.js Logo',
//     path:  'https://storage.360buyimg.com/mtd/home/111543234387022.jpg'
// })
// photos.push({
//     name: 'Ryan Speaking',
//     path:  'https://storage.360buyimg.com/mtd/home/221543234387016.jpg'
// })
// exports.list = function(req, res){
//     res.render('photos/index', {
//         title: '图片列表',
//         photos: photos
//     })
// }
//从数据库独处数据显示图片列表
exports.list = function(req, res, next){
	Photo.find({}, function(err, photos){
		if(err) return next(err);
		res.render('photos', {title: '**图片列表**', photos: photos});
	});
}
//连上数据库
exports.form = function(req, res){
    res.render('photos/upload', {
        title: '图片上传'
    })
}
exports.submit = function(dir){
    console.log(22, dir)
   return function(req, res, next){
    // console.log(3333, req.files[0]);
       console.log(33, req.files, req.body, next)
        var img = req.files.photoImage;
        var name = req.body.photoName || img.name;
        var path = join(dir, img.name);
        fs.rename(img.path, path, function(err){
            if(err) return next(err);
            Photo.create({
                name: name,
                path: img.name
            }, function(err){
                if(err) return next(err);
                res.redirect('/')
            });
        });
   };
};