const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    //Render HTML using template engine EJS / PUG / handlebars.
    res.render('admin/add-product',
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
    const products = Product.fetchAll();
    res.render('admin/products', 
    { 
        prods: products, 
        pageTitle: 'Admin Product', 
        path: '/admin/products', 
    });
}

