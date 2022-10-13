const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//import database connection...
const sequelize = require('./utils/database');

//importing models from model folder...
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

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

app.use((req,res,next) => {
    User.findOne({ where: { id: 1 }})
    .then((user) => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    })
})

//Setting up routes...
app.use('/admin',adminRoutes);
app.use(shopRoute);

app.use(errorController.get404);


//Creating a relation between tables or Sequelize model classes
Product.belongsTo(User, {constraints : true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

//sequelize.sync({force: true}) //Don't use force for production...
sequelize.sync()
.then(result => {
    return User.findOne({ where: { id: 1 }})
})
.then((user) => {
    if(!user){
        User.create({name: "Anees", email:"anees@gmail.com" });
    }
    return user;
})
.then((user) => {
    return user.createCart();
})
.then((cart) => {
    console.log('Server is running on ',3002);
    app.listen(3002)
})
.catch(err => {
    console.log(err)
});


