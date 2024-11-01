const cart = require('../models/cartModel');

// const user = require('../models/user')


exports.cartCreate = async(userId, productId, quantity) => {
    console.log('cartservice layer wrkng');
    // console.log('productId=' , productId);
    // console.log('userId = ', userId);
    // console.log('quantity=' , quantity);

    try{
        const cartDetails = await  cart.createCart(userId,productId, quantity);
        console.log('servicelayer cart' , cartDetails)
        // return cartDetails[0];
        if(cartDetails){
            const cartResponse = {
                userId : userId ,
                productId : productId ,
                quantity : quantity
            }
            console.log('cart response', cartResponse);
            return cartResponse;
        }else {
            const responseData = {message:'something went wrong'};
            return responseData;
        }
        
    }
    

    catch(err) {
        console.log(err);
        return err;
    }
}


//  exports.cartFetch=async() => {
//     try{
//         const cartDetails=await cart.fetchAll()
//         console.log('cartdetails working service');
//         return cartDetails
//     }catch(err){
//         console.log(err);
//         return err; 
//     }
// }

// exports.cartAddQuantity = async(userId, productId, quantity) => {
//     console.log('from sevice layer add quantity')

//     try{
//         const existcart = await cart.getCart(userId, productId)
//         console.log('existing' , existcart)
        

//         if(existcart.length > 0){
//             console.log('going to update')
//             const cartDatas = await  cart.updateQuantity(userId, productId, existcart[0].quantity+quantity)
//             return cartDatas;
//         }
//         else{
//             console.log('insert new one')
//             const insertNew = await cart.createCart(userId, productId, quantity)
//             return insertNew;
//         }
//         // return existcart[0];

//     }
//     catch(err) {
//         console.log(err)
//         return err;
//     }
// }


// exports.deleteCartItem = async( productId) => {
//     console.log('from service layer delete')
//     try{
//         const cartdeletedata = await cart.deleteData( productId)
//         return cartdeletedata[0];
//     }

//     catch(err) {
//         console.log(err)
//         return err;
//     }
// }

// exports.getAllCart = async(userId) => {
//     console.log('from service layer get all cartitem')

//     try{
//         const getAllData = await  user.getEmailId(userId)
//         // return getAllData[0]

//         if(getAllData.length > 0 && getAllData[0].email ){
//             const getCartItems = await cart.getCartItems(userId)
//             console.log(getCartItems)
//             // return getCartItems;
//             const getAllItem = {email : getAllData[0].email , cartItems:getCartItems }
//             return getAllItem;


//             // const itemList = {
//             //     email: getAllData[0].email,  
//             //     items: getCartItems.map(item => ({
//             //         productId: item.productId,
//             //         productName: item.productName,
//             //         price: item.productPrice,
//             //         quantity: item.quantity,
//             //         totalAmount: item.totalPrice
//                 // }))
//             // };

//             // return itemList;
//         }
//         else{

//         }
//         //  return getAllData[0]

//     }

//     catch(err)  {
//         console.log(err)
//         return err;
//     }
// }