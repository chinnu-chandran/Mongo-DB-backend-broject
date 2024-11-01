const products = require('../service/productSevice')

const product = require('../models/productModel')

exports.postProduct = async(req,res,next) => {
   console.log('from product cntrl') //cntrler wrkng

//    const name = req.body.name;
//    const description = req.body.description;
//    const price = req.body.price;

//    console.log(req.body); 

try{
    console.log(JSON.stringify(req.body) , 'product data from postman');
    const {
        productId,
        name  ,
        description ,
        price 

    } =req.body;

if (!name || !description || !price  || !productId) {
     return res.send({ error: 'Incorrect parameter name' });
        }    

//     //adding service layer

    const imageFile = req.file;
    const imageBase64 = imageFile.buffer.toString('base64');
    const productData = await products.productCreate(productId, name, description, price,imageBase64)
    res.send(productData)

}

catch(err) {
    console.log(err)
    return err;
}
}




exports.getProduct = async (req,res,next) => {
try{
    limit_per_page = 2;
    const page = parseInt(req.query.page) || 1;
    const getproductData = await products.getAllProducts(page, limit_per_page)
    // console.log('from get All users')
    res.send (getproductData)
}
catch (err) {
    console.log(err)
    return err;
}
}

exports.getProductById = async(req,res,next) => {
    const productId = req.params.productId;
    try{
    //    console.log('by id')
    const getDataById = await products.getById(productId);
    // if (getDataById && getDataById.message) {
    //     return res.status(200).json(getDataById);
    // }
    //     return res.status(404).json(getDataById);
    res.send(getDataById)
    }
    catch (err){
        console.log(err);
        return res.status(500).json({ message: "An error occurred." });

    }
}


exports.deleteProductById = async(req, res, next) => {
    try {
       console.log('from cntrl layer') 
       const productId = req.params.productId;
       const deleteData = await products.deleteProduct(productId);
       res.send(deleteData)
       return (deleteData);
       
    } 
    
    catch (err) {
        console.log(err)
    }
}

exports.updateProductById = async(req,res,next) => {
    try {
        const productId = req.params.productId; 
        const{
            name,
            description,
            price
        
      } = req.body ; 
        const updateData = await products.updateProductDetails(productId, name, description, price)
        res.send(updateData)
        return updateData; 
      }
       catch (err) {
        console.log(err)
        return err;  
      }
  }
