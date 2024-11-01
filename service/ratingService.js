
const product = require('../models/productModel');

const user = require('../models/user')

const Rating = require('../models/ratingModel');


exports.addRating = async(productId, userId, rating, description)=> {
    try {
      const productExists = await product.checkExistProduct(productId);
      const userExists= await user.checkExistUser(userId)
      if  (!productExists || productExists.length === 0) {
        return { message: "Product does not exist" };
      }

      if  (!userExists || userExists.length === 0) {
        return { message: "User does not exist" };
      }
      const newRating = new Rating(productId, userId, rating, description);
      const result= await newRating.addRatings();
      return result;

      
    } 
    catch (err) {
        console.log(err);  
    }
    }

    exports.getAllRatings = async(productId) =>{
      try{
        const ratingDetails = await Rating.fetchRatings(productId)
        return ratingDetails;
    }
    catch (err){
        console.log(err)
        return err;
    }
    }