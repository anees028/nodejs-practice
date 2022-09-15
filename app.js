const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Importing files from routes
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));

app.use(adminRoute);
app.use(shopRoute);

app.use((req,res,next)=> {
    res.status(404).send('<h1>Page not found :(</h1>')
})

app.listen(3000);
