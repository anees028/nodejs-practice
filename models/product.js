const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const Cart = require('./cart');

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id){
        const existingIndex = products.findIndex(prods => prods.id === this.id);
        const updateProduct = [...products];
        updateProduct[existingIndex] = this;
        fs.writeFile(p, JSON.stringify(updateProduct), err => {
          console.log(err);
        });
      }
      else{
        this.id = Math.random();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  delete(prodId){
    getProductsFromFile(products => {
      if(prodId){
        const product = products.find(prod => prod.id === prodId);
        //Using Array splice methode ....
        // const existingIndex = products.findIndex(obj => obj.id === prodId);
        // const updateProducts = [...products];
        // updateProducts.splice(existingIndex, 1);

        //Using Array filter methode....
        const updateProducts = products.filter(obj => obj.id !== prodId); //removing from product array....
        fs.writeFile(p, JSON.stringify(updateProducts), err => {
          if(!err){
            //Cart.deleteProduct(prodId,parseInt(product.price) )
          }
          else{
            console.log(err);
          }
        });
      }
      else{
        console.log("Product Not found"); 
      }
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

};

