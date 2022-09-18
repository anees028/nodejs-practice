const express = require('express');
const path = require('path');

const adminData = require('./admin')

const rootDir = require('../utils/path')

const router = express.Router();

router.get('/',(req, res, next) => {
    // console.log('Shop' , adminData.products)
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop', {prods: adminData.products, pageTitle:'Shop', path:'/'})
})

module.exports = router;

