let Entry = require('../lib/entry');
exports.list = function(req, res, next){
    Entry.getRange(0, -1, function(err, entries){
        if (err) return next(err);
        res.render('entries', {
            title: 'Entries',
            entries: entries,
        })
    })
}
exports.form = function(req, res){
    res.render('post', {title: '涂鸦墙'});
}

exports.submit = function(req, res, next){
    let data = req.body
     console.log(' 99999res.local--->', res.local,'---req.user.name---->', req.user,   '####--data', data.title, 'req.body--->', req.body)
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

