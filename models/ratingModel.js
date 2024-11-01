const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

module.exports = class Ratings {
    constructor(productId, userId,rating, description) {
        this.productId = parseInt(productId);
        this.userId = parseInt(userId);
        this.rating = parseInt(rating);
        this.description = description;
    }


     addRatings = async() => {
    try {
        const db = getDb();
        // let dbData ;
       const  dbData = await db.collection('ratings').insertOne({
            productId: this.productId,
            userId: this.userId,
            rating: this.rating,
            description : this.description 
        });
        return dbData;
           


    } 
    catch (err) {
        console.log(err);
  
    }
}

static fetchRatings = async (productId) => {
    try{
        const  db= getDb();
        const getData = await db.collection('ratings')  .find({ "productId": parseInt(productId) }) .toArray()
        console.log(getData)
        return getData;
        }

        catch(err) {
            console.log(err)
            return err;
        }
}
}