const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const expressHbs = require('express-handlebars');

const app = express();

//Setting global configration...

//Using and setting PUBG template engine...
//app.set('view engine', 'pug');

//Using and Setting HandleBars as templating engine
app.engine(
    'hbs', 
    expressHbs.engine({
        layoutsDir: 'views/layouts/', 
        defaultLayout:'main-layout', 
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs')

app.set('views', './views');

//Importing files from routes
const adminData = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminData.routes);
app.use(shopRoute);

app.use((req,res,next)=> {
    //res.status(404).sendFile(path.join(__dirname, './', 'views', '404.html'))
    res.render('404', {pageTitle:'404 Page not found'})
})




console.log("Server is running on 3000")
app.listen(3000);
