const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

//Importing files from routes
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',adminRoute);
app.use(shopRoute);

app.use((req,res,next)=> {
    res.status(404).sendFile(path.join(__dirname, './', 'views', 'page-not-found.html'))
})

app.listen(3000);
