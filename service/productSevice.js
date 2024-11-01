// const { getProduct } = require('../controllers/productController')
const product = require('../models/productModel')

const Rating = require('../models/ratingModel')

exports.productCreate = async(productId,name, description, price, imageBase64) => {
    // console.log('service layer wrkng')
    // console.log('service layer name', name)
    // console.log('service layer description', description)
    // console.log('service layer price', price)

    try{
        const newProduct = new product(productId,name, description, price, imageBase64)
        const existProduct = await product.checkExistProduct(productId)
        if(existProduct.length > 0){
            return {"message" : "ProductId already exists"}
        }
        else {
            const newProductData =  await newProduct.save(productId, name, description, price, imageBase64);
            console.log('service layer userdata' , newProductData)
             return newProductData ;  
        }
    }
    catch(err){
        console.log(err)
        return err;
    }

}



exports.getAllProducts = async (page, limit_per_page) => {
    try{
        const productDetails = await product.fetchProducts(page, limit_per_page)
        console.log('service layer get user')
        return productDetails;
    }
    catch{
        console.log(err)
        return err;
    }
}

// exports.getById = async(productId) => {
//     try {   
//         // console.log('from service')
//         const data = await product.checkExistProduct(productId)
//         // return data;
//         if( data.length > 0) {
//             const fetchProduct = await product.getProductById(productId);
//             // if (!fetchProduct) {
//             //     return { "message": "Product doesn't exist" }; // This may not be necessary if `checkExistProduct` is reliable.
//             // }

//             const ratings = await Rating.fetchRatings(productId);
//             // let averageRating = 0;

//             if (ratings.length>0) {
//                 console.log('hai')
//                 const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
//                 const averageRating = (totalRating / ratings.length);
//                 await product.updateRating(productId, averageRating);
            
//                 return {
//                     ...fetchProduct,
//                     averageRating: averageRating.toFixed(2)
//                 };
//             }
//                 else{
//                     return{
//                     ...fetchProduct,
//                     averageRating:' no ratings yet'
//                     }
//                 }
//             }
//             else{
//                 return {"message" :'product not exists'}
//             }
          
           
//         } 
       
    
//     catch (err) {
//         console.log(err)
//         return err;
//     }
// }
exports.getById = async (productId) => {
    try {
        console.log('Checking productId:', productId);
        const data = await product.checkExistProduct(productId);
        console.log('CheckExistProduct result:', data);

        if (data.length > 0) {
            const fetchProduct = await product.getProductById(productId);
            console.log('Fetched Product:', fetchProduct);
            const ratings = await Rating.fetchRatings(productId);
            let averageRating = 0;

            if (ratings.length > 0) {
                const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
                const averageRating = totalRating / ratings.length;
                await product.updateRating(productId, averageRating);

                return {
                    ...fetchProduct,
                    averageRating: averageRating.toFixed(2)
                };
            } else {
                return {
                    ...fetchProduct,
                    averageRating: 'no ratings yet'
                };
            }
        } else {
            return { "message": 'product not exists' };
        }
    } catch (err) {
        console.log('Error:', err);
        return err;
    }
};


exports.updateProductDetails = async(productId ,updatedName,updatedDescription,updatedPrice) => {
    try {
       const updateData = await product.updateProducts(productId ,updatedName,updatedDescription,updatedPrice)
       return updateData;
    } catch (err) {
       console.log(err)
    }
   }

exports.deleteProduct = async(productId) =>{
    try {
        console.log('from service layer')
        const existProducts = await product.checkExistProduct(productId)
        
        if(existProducts.length > 0){
            const dataDelete = await product.deleteById(productId);
            return dataDelete;  
        }
        else {
        return {"message" : " product not exists"}
        }
    } 
    catch (err) {
      console.log(err)  
    }
 }
