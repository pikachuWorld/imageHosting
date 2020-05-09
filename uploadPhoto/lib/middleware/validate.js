function parseField(field){
    return field.split(/\[|\]/).filter(function(s){return s});
}

function getField(req, field){
    let val = req.body;
    field.forEach(function(prop){
        // console.log('----333-->', prop)
        val = val[prop];
    })
    return val;

}

exports.required = function(field){
    field = parseField(field);
    // console.log('***111*required****', field)
    return function(req, res, next){
        if(getField(req, field)){
            next()
        } else {
            res.error( 'title  is required');
            res.redirect('back')
        }
    }
}

exports.lengthAbove = function(field, len){
    field = parseField(field);
    // console.log('****22lengthAbove****', field, '---len---', len)
    return function(req, res, next){
        if(getField(req, field).length > len){
            next()
        } else {
            res.error( 'title  must have more than ' + len + ' characters');
            res.redirect('back')
        }
    }
}
