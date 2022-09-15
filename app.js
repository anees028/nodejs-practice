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

app.listen(3000);
