const mongodb = require('mongodb');

const  MongoClient = mongodb.MongoClient;  //used to connect to a MongoDB database from a Node.js application

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect( "mongodb+srv://task2:nbaSAwtxephVsuDx@cluster0.3cb3b.mongodb.net/test")
    .then( client => {
    console.log('connected');
    _db = client.db()
    callback();
    })
    .catch(err => {
         console.log(err)
         throw err;
});
};

const getDb = () => {
  if(_db) {
    return _db;
  }  
  throw 'no database found' ;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;