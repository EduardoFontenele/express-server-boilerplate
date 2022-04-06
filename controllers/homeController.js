exports.index = (req, res, next) => {
    req.session.user = { name: 'Eduardo', isLogged: true }
    console.log(req.session.user)
    res.render('index')
}

exports.handlePost = (req, res, next) => {
    res.send('Done')
}