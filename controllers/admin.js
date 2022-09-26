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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, description, price)
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

