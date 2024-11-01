const mongodb = require('mongodb');

const getDb = require ('../util/database').getDb

module.exports = class cart {
    static createCart = async(userId,productId,  quantity) => {
        // console.log('from models cart')

        try{
            //add query
            const db = getDb();
        // let dbData ;
       const dbData = await db.collection('carts').insertOne(userId, productId, quantity);
       return dbData
        }

        catch (err){
            console.log(err)
            return err;
        }
    }

//     static fetchAll=async ()=> {
//         try{
//             const cartData= await db.execute('SELECT carts.*,products.price, (products.price * carts.quantity) AS totalPrice FROM carts JOIN products ON products.id = carts.productId');
//             console.log(cartData[0])
//             return cartData[0];
//         }
//        catch(err){
//     console.log(err);
//     return err;
//        }
//      }

//     static getCart = async(userId, productId) => {
//         // console.log('hi')
//         try {
//            const getCartData = await db.execute('SELECT * FROM carts WHERE userId = ? AND productId = ?', 
//             [userId,productId] ) 
//             // console.log('cartdatas', getCartData)
//             // console.log(typeof(getCartData))
//             return getCartData[0]
//         } 
//         catch (err) {
//            console.log(err) 
//            return err;
//         }
//     }

//     static updateQuantity = async(userId, productId, quantity) =>  {
//         console.log('from model layer add quantity')
//         try {
//          //sql query
//             const cartAdd =  await db.execute('UPDATE carts SET quantity = ? WHERE userId =? AND productId =? ' ,
//             [quantity , userId, productId])
//             console.log(cartAdd[0])
//             return cartAdd[0];
//         }
//         catch(err) {
//             console.log(err)
//             return err;
//         }
    
//      }


//      static deleteData = async(productId) => {
//         console.log('from model layer delete')
//         try{
//             const cartdel = await db.execute('DELETE FROM carts WHERE productId= ?' , [productId])
//             return cartdel[0]
//         }
//         catch{
//             console.log(err)
//             return err;
//         }
//      }

//      static getCartItems = async(userId) => {
//         console.log('from model layer get all cart items')

//         try{
//             const getAllItem = await db.execute('SELECT users.email AS userEmail, carts.cartId,carts.productId, products.name AS productName, products.price AS productPrice,  carts.quantity,(products.price * carts.quantity) AS totalPrice  FROM  carts JOIN  products ON carts.productId = products.id JOIN users  ON carts.userId = users.userId WHERE  carts.userId = ?' ,[userId])
//             console.log (getAllItem)
//             return getAllItem[0];
            
//         }
//         catch(err) {
//             console.log(err)
//             return err;
//         }
//      }
  
}