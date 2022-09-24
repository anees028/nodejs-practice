const express = require('express');
const path = require('path');

const adminData = require('./admin')

const rootDir = require('../utils/path')

const router = express.Router();

router.get('/', (req, res, next) => {
    //Send response using template engine to the client (EJS, PUG, Handlebars)
    res.render('shop', 
    { 
        prods: adminData.products, 
        pageTitle: 'Shop', path: '/', 
        hasProducts: adminData.products.length > 0,
        activeShop: true,
        productCSS:true,
    })
})

module.exports = router;

