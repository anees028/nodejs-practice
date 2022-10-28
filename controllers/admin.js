const Product = require('../models/product');
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

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
  
  const product = new Product(title,price,description,imageUrl);
  product.save().then(result => {
    res.redirect('/admin/products'); 
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getEditProduct = (req, res, next) => {
  let productId = req.params.productId;
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  Product.findById(productId)
  .then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: editMode,
      product: product,
    });
  }).catch(err => {
    console.log(err);
  })
};

exports.postEditproduct = (req, res, next) => {
  let productId = req.body.productId;
  const upTitle = req.body.title;
  const upImageUrl = req.body.imageUrl;
  const upPrice = req.body.price;
  const upDescription = req.body.description;
  const product = new Product(upTitle, upPrice, upDescription, upImageUrl, new ObjectId(productId));
  product.save().then(result => {
    res.redirect('/admin/products');
    console.log("Updated Result")
  }).catch(err => {
    console.log(err)
  })
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then((products) => {
  res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => {
    console.log(err)
  });
};


// exports.deleteProduct = (req, res, next) => {
//   let productId = parseInt(req.body.productId);
//   Product.destroy({where: {id: productId}}).then(() => {
//     return res.redirect('/admin/products');
//   }).catch(err => {
//     console.log(err)
//   });
// }

