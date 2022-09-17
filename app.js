const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

//Importing files from routes
const adminData = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminData.routes);
app.use(shopRoute);

app.use((req,res,next)=> {
    res.status(404).sendFile(path.join(__dirname, './', 'views', '404.html'))
})




console.log("Server is running on 3000")
app.listen(3000);
