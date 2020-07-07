var redis = require('redis')
var bcrypt =  require('bcrypt')
var db = redis.createClient()


function User(obj){
    // console.log('obj--->', this)
    for(var key in obj){
        this[key] = obj[key];
    }
}
//用户模型save实现
User.prototype.save = function(fn){
   
    if(this.id) {
       this.update(fn)
    } else {
        var user = this;
       db.incr('user:ids', function(err, id){
           if(err) return fn(err);
            user.id = id;
           user.hashPassword(function(err){
               if(err) return fn(err);
                user.update(fn);
            })
        })
        
    }
}

User.prototype.update = function(fn){
    var user = this;
    var id = user.id
    // console.log('*****update---this', this)
    db.set('user:id:' + user.name, id, function(err){
        if(err) return fn(err);
        db.hmset('user:' +id, user, function(err){
            fn(err)
        })
    })
}
// 用户模型中添加bcrypt
User.prototype.hashPassword = function(fn) {
    var user =this;
    bcrypt.genSalt(12, function(err, salt){
       if(err) return fn(err);
        user.salt = salt;
        // console.log('**333--this--->',this, '-***-fn--->', fn, '**user--->', user, '**err--->', err, '**--salt-->', salt)
       bcrypt.hash(user.pass, salt, function(err, hash){
            if(err) return fn(err);
            user.pass = hash;
            fn();
           
        })
    })
}
//从redis中取得用户
User.getByName = function(name, fn){
    console.log('!!!!getByName', name)
    User.getId(name, function(err, id){ //

        if(err) return fn(err);
        User.get(id, fn);
    })
}
User.getId= function(name, fn){
     db.get('user:id:' + name, fn)
} 
   
User.get = function(id, fn){
    db.hgetall('user:' + id, function(err, user){
        // console.log('******', user)
        if(err) return fn(err);
        fn(null, new User(user));
    })
}
//认证用户登录
User.authenticate= function(name, pass ,fn){
    console.log('@@@@@authenticate@@@', name, pass )
    User.getByName(name, function(err, user){
        if(err) return fn(err);
        if(!user.id) return fn()
        bcrypt.hash(pass, user.salt,  function(err, hash){
            if (err) return fn(err);
            if (hash==user.pass) return fn(null, user)
            fn();
        });
    });
};


//测试用户保存逻辑
// var tobi = new User({
//     name: "sophia",
//     pass: "I am a sophia",
//     age: 20
// })
// tobi.save(function(err){
//     if(err) throw err;
//     console.log('999999user id %d', tobi.id)
// })

module.exports = User;