const Wishlist = require('../service/wishlistService')

exports.addToWishlist = async(req, res, next) => {
    const userId = req.userId;
    const productId = req.body;
    try {
        const result = await Wishlist.addWishlist(userId, productId);
        res.send(result)
    } 
    catch (err) {
        console.log(err)
    }
}