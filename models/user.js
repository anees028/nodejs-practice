const getDb = require('../utils/mongo-database').getDb;
const mongodb = require('mongodb');

class User {
    constructor(username,email, id){
        this.username = username;
        this.email = email;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save(){
        const db = getDb();
        let dbOp;
        if(this._id){

        }
        else{
            dbOp = db.collection('users').insertOne(this)
        }
        return dpOp.then(user => {
            console.log(user);
        }).catch(err => {
            console.log(err);
        })
    }

    static findById(userId){
        const db = getDb();
        return db.collection('users').find({_id: new mongodb.ObjectId(userId)}).next().then(user => {
            return user;
        }).catch(err => {
            console.log(err);
        })
    }
}

module.exports = User;


