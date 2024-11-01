const path = require('path')

const express = require('express');

const multer = require('multer');


const routes = express.Router();

const upload = multer();


const userController = require('../controllers/user');

const productController = require('../controllers/productController');

const cartController = require('../controllers/cartController');

const ratingController = require('../controllers/ratingContoller');

const searchController = require('../controllers/searchController');

const wishlistController = require('../controllers/wishlistController');






const { tokenAuthentication } = require('../middleware/authentication');


const userTypes = {
    ADMIN: 'admin',
    USER: 'user',
    OWNER: 'owner'
};


routes.post('/login' , userController.postLogin)

// routes.post('/logout' , (req,res) => {
//     req.session.destroy(err => {
//         if (err) {
//           return res.send({ message: 'Logout failed' });
//         }
//         res.send({ message: 'Logout successful' });
//       });
// })


routes.post ('/user' , userController.postCreateUser);

routes.get ('/users',tokenAuthentication([userTypes.ADMIN]), userController.getUser)


// routes.get ('/users' , tokenAuthentication, async (req, res, next) => {
//     try{
//         const users = await  userController.getUser;
//     if (!users) {
//         return res.status(404).send({ message: 'User not found' });
//     }
//     res.send(users) 
//     }
//     catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// });



routes.get('/users/:userId',tokenAuthentication ([userTypes.ADMIN]), userController.getUserById);

routes.delete('/users/:userId',tokenAuthentication ([userTypes.ADMIN]), userController.deleteUserById )

routes.post('/users/:userId' , userController.updateUserById )


  

routes.post ('/product' ,upload.single('image'),tokenAuthentication ([userTypes.ADMIN, userTypes.OWNER]), productController.postProduct);


routes.get ('/products' , productController.getProduct);

routes.get('/products/:productId', productController.getProductById);

routes.delete('/products/:productId',tokenAuthentication ([userTypes.ADMIN, userTypes.OWNER]), productController.deleteProductById )

routes.post('/products/:productId',tokenAuthentication ([userTypes.ADMIN, userTypes.OWNER]), productController.updateProductById )



routes.post('/product/rating/:productId', ratingController.postRating);

routes.get('/product/ratings/:productId', ratingController.getRating);


routes.get('/search', searchController.searcProducts);

routes.post('/wishlist',tokenAuthentication ([userTypes.USER]), wishlistController.addToWishlist);





routes.post ('/users/:userId/cart' , cartController.postCart);





module.exports = routes;