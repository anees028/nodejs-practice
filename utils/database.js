//Conecting with sequelize...

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    //Build connecting with Mongo Atlas...
    MongoClient.connect('mongodb+srv://anees:anees1234@nodejsapp.vyd8ed0.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected');
        callback(client);
    }).catch(err => {
        console.log(err);
    });

};

module.exports = mongoConnect;
