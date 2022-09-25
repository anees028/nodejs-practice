const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    //Render HTML using template engine EJS / PUG / handlebars.
    res.render('add-product',
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            activeAddProduct: true,
            formsCSS: true,
            productCSS: true,
        });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save();
    res.redirect('/')
};

exports.getProducts = (req, res, next) => {
    //Send response using template engine to the client (EJS, PUG, Handlebars)
    const products = Product.fetchAll()
    res.render('shop', 
    { 
        prods: products, 
        pageTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS:true,
    })
}
