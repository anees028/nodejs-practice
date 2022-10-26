//Conecting with sequelize...

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    //Build connecting with Mongo Atlas...
    MongoClient.connect('mongodb+srv://anees:anees1234@nodejsapp.vyd8ed0.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected');
        //_db = client.db();
        callback(client);
    }).catch(err => {
        console.log(err);
        throw err;
    });

};

const getDb = () => {
    if(_db){
        return db;
    }
    throw "No database found";
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
