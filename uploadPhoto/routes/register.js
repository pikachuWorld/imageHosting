
var User = require('../lib/user')

exports.form = function(req, res){
    res.render('register', {title: '##Register'})
}
exports.submit = function(req, res, next){
    var data = req.body;
    console.log('##999---user->', req.body)
    User.getByName(data.name, function(err, user){  //检查用户名是否唯一
         console.log('##888822----user->', data, 'user', user)
        if(err) return next(err)
        if(user.id){
            console.log('##33--11--user->')
            res.error('username already taken!');
            res.redirect('back')
        } else{
            console.log('##33--22--user->')
            user = new User({
                name: data.name,
                pass: data.pass,
                iphone: data.iphone
            })
            
            user.save(function(err){
               if(err) return next(err);
                req.session.uid = user.id;
                res.redirect('/')
            })
        }
    })
}