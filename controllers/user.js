const {validationResult} = require('express-validator')

const users = require('../service/user-service')

const user = require('../models/user')

const { validateCreateUser } = require('../validations/user-validation'); 


const jwt = require('jsonwebtoken')

const userTypes =Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
    OWNER: 'owner'
});

exports.postCreateUser = [
    ...validateCreateUser,
async(req,res,next) => {
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const email = req.body.email;
    

    console.log('cntrl layer wrkng') //control layer working
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
      }

    try{
        // console.log(JSON.stringify(req.body) , 'data from postman');
        const{
            userId,
            firstName  ,
            lastName ,
            email ,
            password,
            type,
            phone
          
        } = req.body ;

        if(!Object.values(userTypes).includes(type)){
            return res.status(400).json({message:`Invalid Type.only use:${Object.values(userTypes).join(',')}`});
        }

        // console.log(req.body); 
        
       //Here we checks the parameter names are passed correctly

        // if (!userId || !firstName || !lastName  || !email) {
        //     return res.send({ error: 'Incorrect parameter name' });
            
        //        } 

      //adding service layer 

        const userData = await users.userCreate(userId ,firstName, lastName , email ,password, type , phone);
        res.send(userData)
        return userData;
    }

    catch (err) {
        console.log('error', err)
        res.send(err,'error occured')
    }
}
]

exports.postLogin =

async(req, res, next) => {

// console.log('from login cntrl layer')


const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
      }
      
try{
    const{
        email,
        password
    } = req.body;

    const loginData =  await users.userLogin(email, password);
    if(!loginData){
        return res.send({message: 'invalid details'})
    }

    const token = jwt.sign({
        email:loginData.email,
        Id : loginData._id.toString() , //payload - datas u want to encode in the token
        role: loginData.type
    } ,
    'my secret key' ,   //secret key
    {expiresIn : '1h'}    
    );
    return res.send({token,
           Id : loginData._id.toString() ,
           
           message: 'Logged in successfully' 
    })
}
catch(err){
    console.log(err);
    res.status(500).send({ message: 'Server error' });
}

}


// exports.getLogin = async(req,res,next) => {
//     try {
//       const getLoginData = await users.getLoginUser() 
//       res.send(getLoginData) 
//     } 
//     catch (error) {
        
//     }
// }


exports.getUser = async (req,res,next) => {
    console.log('from cntrl layer getuser')//getuser wrkng
    try{
        //add service layer
        const getuserData = await users.getAllUser()
        console.log('from get All users')
        res.send (getuserData)
    }
    catch (err) {
        console.log(err)
        return err;
    }
}


exports.getUserById = async (req,res,next) => {
    const userId = req.params.userId;
    // console.log(userId)
    try {   
    //   console.log('hi from userby id ')  
    const usersData = await users.getUserId(userId)
    res.send(usersData)

    } 
    
    catch (err) {
       console.log(err) 
       return err;
    }
}

exports.deleteUserById = async(req, res, next) => {
    try {
       console.log('from cntrl layer') 
       const userId = req.params.userId;
       const deleteData = await users.deleteUser(userId);
       console.log(deleteData)
       res.send(deleteData)
       return (deleteData);
       
    } 
    
    catch (err) {
        console.log(err)
    }
}

exports.updateUserById = async(req,res, next) => {
    try {
      const userId = req.params.userId; 
      const{
        firstName  ,
        lastName ,
        email 
      
    } = req.body ; 
      const updateData = await users.updateUserDetails(userId,firstName,lastName,email)
      res.send(updateData)
      return updateData; 
    }
     catch (err) {
      console.log(err)  
    }
}

















































