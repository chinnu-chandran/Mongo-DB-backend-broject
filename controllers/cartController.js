const carts = require('../service/cartService')
const cart = require('../models/cartModel')
// const user = require('../models/user')


exports.postCart = async(req,res,next) => {
    console.log('from cart cntrl') //cntrler wrkng

//     const productId = req.body.productId;
//     const userId = req.body.userId;
//     const quantity = req.body.quantity;

//    console.log(req.body);

try{
    const userId = req.params.userId;
    console.log(JSON.stringify(req.body) , 'cart data from postman');
    const {
        productId = productId,
        // userId = userId ,
        quantity = quantity

    } =req.body;

    //service layer
    const cartData = await carts.cartCreate(userId ,productId, quantity)
    res.send(cartData)
}

catch(err){
    console.log(err)
    return err;

}
}



// exports.getCart=async(req,res,next) => {
//     try{
//         const cart = await  carts.cartFetch();
//         console.log('this is cart get method');
//         res.send(cart);
//     }catch(err){
//         console.log(err);
//     }
// }

// exports.putAddCart = async(req,res,next) => {
//     console.log('from cntrl layer add  quantity')

//     try{
//         const userId = req.params.userId;
//         console.log(JSON.stringify(req.body) , 'cart add data from postman');
//     const {
//         productId = productId,
//         quantity = quantity

//     } =req.body;
//     //service layer
//         const addQuantity = await carts.cartAddQuantity(userId, productId, quantity)
//         res.send(addQuantity)
//     }
//     catch (err){
//         console.log(err)
//         return err;
//     }
// }

// exports.deleteCart = async(req,res,next) => {
//     console.log('from cntrl layer delete')

//     try{
//         const productId = req.query.productId;
//         const userId = req.params.userId;
//         const cartDeleteItem = await carts.deleteCartItem(productId, userId)
//         res.send(cartDeleteItem)
//         console.log('deleted')
//     }
//     catch(err){

//         console.log(err)
//         return err;
//     }
// }


// exports.getCartItems = async(req,res,next) => {
//     console.log('from cntrl layer get all cart items')

//     try{
//         const userId = req.params.userId;
//         const getAll = await carts.getAllCart(userId);
//         res.send(getAll)
//         console.log('get all items')
//     }
//     catch(err) {
//         console.log(err)
//         return err;
//     }

// }






