
exports.page404 = (req,res,next)=> {
    //res.status(404).sendFile(path.join(__dirname, './', 'views', '404.html'))
    res.render('404', {pageTitle:'404 Page not found'});
}
