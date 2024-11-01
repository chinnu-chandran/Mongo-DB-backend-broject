const mongodb = require('mongodb');

const getDb = require('../util/database').getDb

module.exports = class Wishlist {
    constructor(userId, productId) {
        this.userId = userId;
        this.productId = productId;
    }

    static addTowishlist = async(userId, productId) => {
        const db = getDb();
        const wishlistEntry = { userId: userId, productId: productId }; 
        await db.collection('wishlists').insertOne(wishlistEntry);
        const product = await db.collection('products').findOne({ productId: productId });
        return { message: 'Product added to wishlist.', product };
    }
  

}

