var photos= [];
photos.push({
    name: 'Node.js Logo',
    path:  'https://storage.360buyimg.com/mtd/home/111543234387022.jpg'
})
photos.push({
    name: 'Ryan Speaking',
    path:  'https://storage.360buyimg.com/mtd/home/221543234387016.jpg'
})
exports.list = function(req, res){
    res.render('photos', {
        title: 'Photos**',
        photos: photos
    })
}