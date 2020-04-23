
var User = require('../lib/user')

exports.form = function(req, res){
    res.render('register', {title: '注册'})
}
exports.submit = function(req, res, next){
    var data = req.body;
    
    User.getByName(data.name, function(err, user){  //检查用户名是否唯一
        if(err) return next(err)
        if(user.id){
            res.error('用户名已经被占用!');
            res.redirect('back')
        } else{
            user = new User({
                name: data.name,
                pass: data.pass,
                iphone: data.iphone,
                email: data.email
            })
            
            user.save(function(err){
               if(err) return next(err);
                req.session.uid = user.id;
                res.redirect('/upload')
            })
        }
    })
}