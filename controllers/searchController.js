const searchService = require('../service/searchService')

exports.searcProducts = async (req, res, next) => {
    const searchString = req.query.search || '';
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : null;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;  
    // console.log('Search Term:', searchString);

    if (!searchString) {
        return res.status(400).json({ error: 'Search string is required' });
    }
    try {
        const searchResults = await searchService.searchDetails(searchString, minPrice, maxPrice);
        // console.log('Search Results:', searchResults)
        res.send(searchResults)
    } 
    catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Error during search', details: err });  
    }
}