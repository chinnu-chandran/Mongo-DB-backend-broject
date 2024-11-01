const Rating = require('../service/ratingService')

exports.postRating = async(req, res, next) => {
    const productId = req.params.productId;
    const {
        userId,
        rating,
        description
    }= req.body;
    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).send({ error: 'Rating must be between 1 and 5' });
    }
    try {
        const productRating = await Rating.addRating(productId, userId, rating, description);
        // if (productRating.message === "Product does not exist") {
        //     return res.status(404).send({ message: "Product does not exist" });
        // }
        res.status(200).send({ message: 'Rating added successfully', ...productRating });

    } 
    catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Failed to add rating' });
    }

}

exports.getRating = async(req, res, next) => {
    const productId = req.params.productId;
    try {
       const ratingData = await Rating.getAllRatings(productId) 
    //    res.send(ratingData)
    if (ratingData && ratingData.length > 0) {        
        res.status(200).json({
            productId: productId,
            ratings: ratingData,
        });
    } else {
        // If no ratings found, send a response with a message
        res.status(404).json({ message: 'No ratings found for this product' });
    }
} catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
}
    } 

