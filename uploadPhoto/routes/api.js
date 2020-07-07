let express = require('express');
let User = require('../lib/user');
// var app = express();

console.log('---User---', User, '--User.authenticate--', User.authenticate)
// Authenticator
// exports.auth = function(req, res, next) {
//     var auth;
//     console.log('---req---', req.headers)
//     if (req.headers.authorization) {
//       auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
//     }
//     console.log('---auth---', auth)
//     if (!auth || auth[0] !== User.authenticate) {
//         // any of the tests failed
//         // send an Basic Auth request (HTTP Code: 401 Unauthorized)
//         res.statusCode = 401;
//         // MyRealmName can be changed to anything, will be prompted to the user
//         res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
//         // this will displayed in the browser when authorization is cancelled
//         res.end('Unauthorized');
//     } else {
//         // continue with processing, user was authenticated
//         next();
//     }
// }
// exports.auth = express.basicAuth(User.authenticate)
exports.user = function(req, res, next){
    console.log('####api####', req.params.id)
    User.get(req.params.id, function(err, user){
        console.log('###user###', user)
        if(err) return next(err);
        if(!user.id) return res.send(404)
        let userInfo = {
            name: user.name,
            id: user.id,
            iphone: user.iphone,
            email: user.email

        }
        res.json(userInfo)
    })
}