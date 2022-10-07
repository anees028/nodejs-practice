const Cart = require('../models/cart');
const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {   //Destructuring the incomming response from Database.
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => {
    console.log(err)
  })
};

exports.getProduct = (req,res, next) => {
  const prodId = parseInt(req.params.productId);
  Product.findById(prodId).then(([product]) => {   //Destructuring the single product from incomming response from Database.
    res.render('shop/product-detail', {
      pageTitle: 'Product Detail',
      product: product[0],
      path:'/products'
    });
  }).catch(err => {
    console.log(err);
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {   //Destructuring the incomming response from Database.
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => {
    console.log(err)
  })
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req,res, next) => {
  const prodId = parseInt(req.body.productId);
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
