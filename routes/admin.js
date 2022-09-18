const express = require('express');
const path = require('path');

const rootDir = require('../utils/path')

const router = express.Router();

const products = [];

// /admin/add-product  => GET 
router.get('/add-product', (req, res, next) => {
    //Rendering simple html file
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    //Render HTML using template engine PUG / handlebars.
    res.render('add-product',
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            activeAddProduct: true,
            formsCSS: true,
            productCSS: true,
        })
})

// /admin/product  => POST 
router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title })
    res.redirect('/')
})

exports.routes = router;
exports.products = products;
