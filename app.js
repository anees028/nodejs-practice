const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

//Setting global configration...

app.set('view engine', 'ejs')

app.set('views', './views');

//Importing files from routes
const adminRoutes = require('./routes/admin');
const shopRoute = require('./routes/shop');

//Importing 404 controller
const pageNotFoundController = require('./controllers/error')

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))

//Setting up routes...
app.use('/admin',adminRoutes);
app.use(shopRoute);

app.use(pageNotFoundController.page404)


console.log("Server is running on 3000")
app.listen(3000);
