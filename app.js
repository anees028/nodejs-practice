const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//importing mongodb....
const mongoConnect = require('./utils/mongo-database').mongoConnect;

//Importing 404 controller
const errorController = require('./controllers/error');

const app = express();

//Setting global configration...
app.set('view engine', 'ejs');
app.set('views', 'views');

//Importing files from routes
// const adminRoutes = require('./routes/admin');
// const shopRoute = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    // User.findOne({ where: { id: 1 }})
    // .then((user) => {
    //     req.user = user;
    //     next();
    // }).catch(err => {
    //     console.log(err);
    // })
})

//Setting up routes...
// app.use('/admin',adminRoutes);
// app.use(shopRoute);

app.use(errorController.get404);

let port = 3002

mongoConnect(() => {
    //console.log(client);
    app.listen(port)
})
console.log("Server is running on port ",port);
