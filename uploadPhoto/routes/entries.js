let Entry = require('../lib/entry');
// let isNaN = function(value) {
//     var n = Number(value);
//     return n !== n;
// };
exports.list = function(req, res, next){
    let page = req.page;
   
    let pageFrom =  isNaN(page.from) ?  0 : page.from;
    let pageTo   =  isNaN(page.to) ?  -1 : page.to;
    page.number = isNaN(page.number) ?  0 : page.number;

    // console.log('*****分页*******', pageFrom, '777---->',  pageTo)
    // Entry.getRange(0, -1, function(err, entries){
    Entry.getRange( pageFrom, pageTo, function(err, entries){
        if (err) return next(err);
        // console.log('****666**entries*****', entries)
        res.render('entries', {
            title: '首页',
            entries: entries,
        })
    })
}
exports.form = function(req, res){
    res.render('post', {title: '涂鸦墙'});
}

exports.submit = function(req, res, next){
    let data = req.body
    //  console.log(' 99999res.local--->', res.local,'---req.user.name---->', req.user,   '####--data', data.title, 'req.body--->', req.body)
    if(!data.msgTitle) {
        res.error("Title is required");
        res.redirect('back');
        return ;
    }
    if(data.msgTitle.length < 4) {
        res.error("title must be longger than 4 characters.")
        res.redirect('back');
        return ;
    }
    let entry =  new Entry({
        "username": req.user.name,
        "title": data.msgTitle,
        "body": data.msgBody,
        "startTime": req._startTime
    })
    entry.save(function(err){
        if (err) return next(err);
        res.redirect('/')
    })

}

