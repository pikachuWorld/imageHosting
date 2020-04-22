var User = require('../lib/user')

exports.form = function(req, res){
    res.render('login', {title: '登录'})
}
exports.submit = function(req, res, next){
    var data = req.body;
    User.authenticate(data.name, data.pass, function(err, user){
        if(err) return next(err)
        if(user){
            req.session.uid = user.id;
            res.redirect('/upload');
        } else { 
            res.error("Sorry! 无效的凭证。");
            res.redirect('back');
        }
    })
}
exports.logout = function(req, res){
    req.session.destroy(function(err){
        if(err) throw err;
        res.redirect('/')
    })
}