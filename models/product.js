const getDb = require('../utils/mongo-database').getDb;
const mongodb = require('mongodb');

class Product{
  constructor(title, price, description, imageUrl, id){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save(){
    const db = getDb();
    let dbOp;
    if(this._id){
      //update Product
      dbOp = db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)}, { $set: this });
    }else{
      //Insert New product
      dbOp = db.collection('products').insertOne(this)
    }
    return dbOp.then(product => {
      console.log(product)
    }).catch(err => {
      console.log(err);
    })
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('products').find().toArray().then(products => {
      console.log(products);
      return products;
    }).catch(err => console.log(err))
  }

  static findById(prodId){
    const db = getDb();
    return db.collection('products').find( { _id: new mongodb.ObjectId(prodId) } ).next().then(product => {
      console.log(product);
      return product;
    }).catch(err => console.log(err))
  }

}


module.exports = Product;

