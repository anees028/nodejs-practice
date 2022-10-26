const { MongoClient } = require("mongodb");

const uri = 'mongodb+srv://anees:anees1234@nodejsapp.vyd8ed0.mongodb.net/?retryWrites=true&w=majority';
const databaseName = "nodeJs";
let _db;

const mongoConnect = callback => {
    MongoClient.connect(uri, { 
        useNewUrlParser: true 
    }).then((client)=> {
        console.log("Connection established - All well");
        _db = client.db(databaseName);
        callback();
    }).catch(err => {
        console.log("Connection failed for some reason");
    })
}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
