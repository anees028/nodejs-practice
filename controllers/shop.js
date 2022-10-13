const Cart = require('../models/cart');
const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => {
    console.log(err)
  })
};

exports.getProduct = (req, res, next) => {
  const prodId = parseInt(req.params.productId);
  Product.findOne({ where: { id: prodId } })
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: 'Product Detail',
        product: product,
        path: '/products'
      });
    }).catch(err => {
      console.log(err);
    });
}

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => {
    console.log(err)
  })
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart => {
    return cart.getProducts().then(prods => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: prods,
      });
    }).catch(err => {
      console.log(err);
    })
  }).catch(err => {
    console.log(err);
  })
  // res.render('shop/cart', {
  //   path: '/cart',
  //   pageTitle: 'Your Cart'
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart() //1 : Get user cart first if exist...
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } }) //2: Get all product of the carts...
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) { //3: Case IF product already existed in Cart... then increase the quantity..
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      return Product.findOne({ where: { id: prodId } }) //4: Case ELSE Adding a new product to cart for the first time...
    })
    .then(product => {
      return fetchedCart.addProduct(product, { through: { quantity: newQuantity } }); //5: Adding the new product in cart items...
    })
    .then(() => {
      res.redirect('/cart')
    }).catch(err => {
      console.log(err);
    })
}

exports.postCartDeleteProduct = (req,res,next) => {
  const prodId = req.body.productId;
  req.user.getCart()// 1: Find the card of the specific user...
  .then(cart => {
    return cart.getProducts({where : {id : prodId}}); //2: Get specific product from the card...
  })
  .then(products =>{
    const product = products[0]; //3: Store specific product in variable ..
    return product.cartItem.destroy(); //4: By DESTROY method it will be destroyed from cartItem table...
  })
  .then(() => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err))
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
