let redis = require('redis')
let db= redis.createClient()


function Entry(obj){
    for(let key in obj){
        this[key] = obj[key]
    }
}

Entry.prototype.save = function(fn){
    let entryJSON = JSON.stringify(this);
    cons
    db.lpush(
        'entries',
        entryJSON,
        function(err){
            if (err) return fn(err)
            fn();
        }
    )
}

Entry.getRange = function(from, to, fn) {
    
    db.lrange('entries', from, to, function(err, items){
        // console.log('--lib--items--', items)
        if (err) return fn(err)
        let entries =[]
        items.forEach(function(item){
            entries.push(JSON.parse(item));
        })
        fn(null, entries);
    })
}

Entry.count = function(fn){
    db.llen('entries', fn);
}

module.exports = Entry;
