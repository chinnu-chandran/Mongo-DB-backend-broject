const mongodb = require('mongodb');

const getDb = require('../util/database').getDb

exports.searchProducts= async(searchString,minPrice, maxPrice) => {
    try {
        const db = getDb();
        const searchRegex = new RegExp(searchString, 'i'); // 'i' for case-insensitive search
        // const products = await db.collection('products').find({
        //     $or: [
        //         { name: { $regex: searchRegex } },
        //         { description: { $regex: searchRegex } } ]}).toArray();
        

        const result = {
            $or: [
                { name: { $regex: searchRegex } },
                { description: { $regex: searchRegex } }
            ]
        };

        if (minPrice || maxPrice) {
            result.price = {
                ...(minPrice ? { $gte: parseFloat(minPrice) } : {}),
                ...(maxPrice ? { $lte: parseFloat(maxPrice) } : {})
            };
        }

        const products = await db.collection('products').find(result).toArray();
        // console.log('Found Products:', products);
        return products;
    } 
    catch (err) {
        console.log('Error during product search:', err);
        throw err;
    }
}