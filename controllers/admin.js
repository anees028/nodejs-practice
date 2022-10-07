const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save().then(() => {
    res.redirect('/')
  }).catch(err => {
    console.log(err)
  });
};

exports.getEditProduct = (req, res, next) => {
  let productId = parseInt(req.params.productId);
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  Product.findById(productId).then(([product]) => {
    if(!product[0]){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product', 
      editing: editMode, 
      product: product[0],
    });
  }).catch(err => {
    console.log(err);
  })
};

exports.postEditproduct = (req,res,next) => {
  let productId = parseInt(req.body.productId);
  const upTitle = req.body.title;
  const upImageUrl = req.body.imageUrl;
  const upPrice = req.body.price;
  const upDescription = req.body.description;
  const updateProd = new Product(productId, upTitle, upImageUrl, upDescription, upPrice);
  updateProd.update(productId);
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([products]) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => {
    console.log(err)
  });
};


exports.deleteProduct = (req,res,next) => {
  let productId = parseInt(req.body.productId);
  Product.deleteById(productId);
  res.redirect('/admin/products')
}

