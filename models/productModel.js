const mongodb = require('mongodb');

const getDb = require('../util/database').getDb

module.exports = class products {
        constructor(productId, name, description, price, imageBase64){
                this.productId = parseInt(productId);
                this.name = name;
                this.description = description;
                this.price =parseInt(price) ;
                this.image = imageBase64;
              
        }
    save = async() => {

        try {
            const db = getDb();
            let dbData ;
           dbData = await db.collection('products').insertOne(this);
           return {
           productId: this.productId ,
           name : this.name ,
           description : this.description ,
           price : this.price,
           image: this.image
           }
        }
         catch (err) {
            console.log(err);
            return err;
        }
       
        }

       

//     static checkExistProduct = async (productId) => {
//     const db = getDb();
//     // Ensure productId is passed correctly based on the expected type in the database
//     const checkData = await db.collection('products').find({ "productId": parseInt(productId) }).toArray();
//     console.log('CheckExistProduct result:', checkData); // Log the result
//     return checkData;
// };

static checkExistProduct = async (productId) => {
    const db = getDb();
    const checkData = await db.collection('products').find({ "productId": parseInt(productId) }).toArray(); // Remove parseInt bcz its stored as a string
    console.log('CheckExistProduct result:', checkData); // Log the result
    return checkData; 
};



    static fetchProducts = async(page, limit_per_page) => {
        try{
     const db = getDb();
     const skip = (page - 1) * limit_per_page; 
     const allProducts = await db.collection('products').find().skip(skip).limit(limit_per_page).toArray();
     console.log(allProducts);
     return allProducts;

        }

        catch(err){
            console.log(err)
            return err;
        }
    }



    static getProductById  = async(productId)=> {
        try {
            console.log('from models')
            const db = getDb();
            const productById = await db.collection('products').findOne({"productId" : parseInt(productId) }); 
            console.log(productById);
            return productById;
        } 
        catch (err) {
            console.log(err)
        }
    }
    static updateRating = async (productId, averageRating) => {
        const db = getDb()

            // Update the product with the new ratings array
           const data= await db.collection('products').updateOne(
                { productId:parseInt(productId) },
                { $set: { averageRating: averageRating } } // Save ratings without calculating average
            );
        return data;
    };
    

    static deleteById = async(productId) =>{
        try {
            const db = getDb() ;
            const deleteRatings = await db.collection('ratings').deleteMany({ productId: parseInt(productId) });
            const deleteProduct = await db.collection('products') .deleteOne({"productId" : parseInt(productId)}) 
            console.log(`Deleted ${deleteRatings.deletedCount} ratings`);
            console.log(`Deleted product with productId: ${productId}`);
            return {
                productDeleted: deleteProduct.deletedCount > 0,
                ratingsDeleted: deleteRatings.deletedCount
            };
        } 
        catch (err) {
            console.log(err)
        }
     }

     static updateProducts = async(productId ,updatedName,updatedDescription,updatedPrice) => {
        try {
           const db = getDb();
           const productUpdate = await db.collection('products') .updateOne({"productId" : parseInt(productId)},{$set : {productId : productId, name: updatedName, description: updatedDescription , price: updatedPrice}}) 
           return {
            productId : productId,
            name : updatedName ,
            description : updatedDescription ,
            price: updatedPrice
           }
        } 
        catch (err) {
           console.log(err) 
        }
     }
    }


