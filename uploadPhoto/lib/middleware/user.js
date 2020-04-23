var User = require('../user')
module.exports = function(req, res, next){
    var uid = req.session.uid;  //会话取出已经登录的的id

    if(!uid) return next();
    User.get(uid, function(err, user){ //从Redis中取出已经登录的用户数据
        if (err) return next(err)
        // console.log('####我是中间件--user--', user)
        req.user = res.locals.user = user;  //将用户数据输出响应对象中
        next();
    });
};