const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//import database connection...
const sequelize = require('./utils/database');

//importing models from model folder...
const Product = require('./models/product');
const User = require('./models/user');

//Importing 404 controller
const errorController = require('./controllers/error');

const app = express();

//Setting global configration...
app.set('view engine', 'ejs');

app.set('views', 'views');

//Importing files from routes
const adminRoutes = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Setting up routes...
app.use('/admin',adminRoutes);
app.use(shopRoute);

app.use(errorController.get404);

Product.belongsTo(User, {constraints : true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize.sync({force: true}) //Don't use force for production...
.then(result => {
    console.log("Server is running on 3002")
    app.listen(3002);
}).catch(err => {
    console.log(err)
});


