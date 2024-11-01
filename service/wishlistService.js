const Wishlist = require('../models/wishlistModel')

exports.addWishlist = async(userId, productId)=>{
    try {
        const result = await Wishlist.addTowishlist(userId, productId);
        return { message: 'Product added to wishlist', data: result };
    } 
    catch (err) {
      console.log(err)  
    }
}
