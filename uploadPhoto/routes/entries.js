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
    console.log('--111####-res.locals---', res.locals, '22####--res--', res)
    let entry =  new Entry({
        "username": res.locals.user.name,
        "title": data.msgTitle,
        "body": data.msgBody,
        "startTime": req._startTime
    })
    entry.save(function(err){
        if (err) return next(err);
        res.redirect('/')
    })

}

