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
  //Simple Product Creation....
  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   userId: req.user.id
  // })

  //Making association relation between User (1) & Product (*) 
  req.user.createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
  })
  
  .then((result) => {
    res.redirect('/admin/products');
    console.log('Created Product')
  }).catch(err => {
    console.log(err)
  })
};

exports.getEditProduct = (req, res, next) => {
  let productId = parseInt(req.params.productId);
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  //Simple way of getting a product using sequelize....
  //Product.findOne({ where: { id: productId } })
  

  //Getting a product as relation between User & Product..
  req.user.getProducts({ where: { id: productId }})
  
  .then(products => {
    const product = products[0]; 
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
  let productId = parseInt(req.body.productId);
  const upTitle = req.body.title;
  const upImageUrl = req.body.imageUrl;
  const upPrice = req.body.price;
  const upDescription = req.body.description;
  const updateProd = new Product(productId, upTitle, upImageUrl, upDescription, upPrice);
  Product.findOne({ where: { id: productId } }).then(product => {
    product.title = upTitle;
    product.price = upPrice;
    product.description = upDescription;
    product.imageUrl = upImageUrl;
    return product.save();
  }).then(result => {
    res.redirect('/admin/products');
    console.log("Updated Result")
  }).catch(err => {
    console.log(err)
  })
}

exports.getProducts = (req, res, next) => {
  //Simple Getting products using Sequelize methode..
  //Product.findAll()
   
  //Getting a product as relation between User & Product..
  req.user.getProducts()
  
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


exports.deleteProduct = (req, res, next) => {
  let productId = parseInt(req.body.productId);
  Product.destroy({where: {id: productId}}).then(() => {
    return res.redirect('/admin/products');
  }).catch(err => {
    console.log(err)
  });
}

