const searchModel = require('../models/searchModel')

exports.searchDetails = async(searchString, minPrice, maxPrice) => {
    console.log('Search String in Service:', searchString);  
   try {
    const products = await  searchModel.searchProducts(searchString, minPrice, maxPrice);
    // console.log('Products from Model:', products);  
    return products;
   }
   catch (err) {
    console.log('error in search service')
   } 
}