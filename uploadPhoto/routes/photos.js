

var path = require('path')
var fs = require('fs')

var join = path.join;
var Photo = require('../models/Photo')

var User = require('../lib/user')
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
		res.render('photos', {title: '图片列表', photos: photos});
	});
}
exports.listpdf = function(req, res, next){
	Photo.find({}, function(err, photos){
		if(err) return next(err);
		res.render('photos/indexpdf', {title: '电子书下载', photos: photos});
	});
}
//连上数据库
exports.form = function(req, res){
  
    res.render('photos/upload', {
        title: '图片上传'
        
    })
}
exports.submit = function(dir){
  return function(req, res, next){
      console.log('*******---photo-req.body--', req.body)
    var userIP = req.headers['x-forwarded-for']  || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    if(!req.user){
            res.redirect('/login');
        } else {
            var img = req.files.photoImage;
            var name = req.body.photoName || img.name;
            var time = req.body.uploadTime
            var path = join(dir, img.name);
            fs.rename(img.path, path, function(err){
                if(err) return next(err);
                Photo.create({
                    name: name,
                    path: img.name,
                    userName: req.user.name,
                    userId: req.user.id,
                    userIp: userIP,
                    time: time,
                    fileType: req.body.fileType
                }, function(err){
                    if(err) return next(err);
                    res.redirect('/list')
                });
            });
        }
       
   };
};
//
exports.download = function(dir){ //设定你要提供的文件所在目录
    return function(req, res, next){ // 设定路由回调
        let id = req.params.id;
        Photo.findById(id, function(err, photo){ //加载照片记录
            console.log('download path---', photo)
            if(err) return next(err)
            let path = join(dir, photo.path); //构造指向文件的绝对记录
            res.sendfile(path)  //
        })
    }
}