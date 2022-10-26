const getDb = require('../utils/mongo-database').getDb;

class Product{
  constructor(title, price, description, imageUrl){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save(){
    const db = getDb();
    return db.collection('products').insertOne(this).then(product => {
      console.log(product)
    }).catch(err => {
      console.log(err);
    })
  }
}


module.exports = Product;

