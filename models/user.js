const { phone } = require('awesome-phonenumber');


const mongodb = require('mongodb');

const getDb = require ('../util/database').getDb

const bcrypt = require('bcryptjs');

module.exports = class user {

    constructor(userId, firstName,lastName,email, password ,type,phone,createdAt,updatedAt) {
        this.userId = userId ;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;                                                                                                                                                                                                   
        this.type = type;
        this.phone = phone;
        this.createdAt= createdAt;
        this.updatedAt= updatedAt;

        // this.userId = Date.now().toString()
    }

    

    save = async() => {
        const db = getDb();
        this.createdAt= new Date(),
        this.updatedAt=new Date()
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        // let dbData ;
       const dbData = await db.collection('users').insertOne(this);
       return {
            userId: this.userId ,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password : this.password,
            type: this.type,
            phone: this.phone

       };
        }

    static  postUserLogin = async(email, password)=> {
            // console.log('model layer wrkng')
            try{
                const db = getDb();
                const userLoginData = await db.collection('users') .findOne({"email" : email})
    
                const passwordCheck = await bcrypt.compare(password, userLoginData.password)
    
                return userLoginData;
            }

            catch(err) {
                console.log(err)
            }
        }


    // static getUserLogin = async()=> {
    //     try {
            
    //     } 

    //     catch (err) {
    //         console.log(err)
    //     }
    // }

//Checks the given userid exists or not
    //     checkExistUser = async(userId) => {
    //         const db = getDb();
    //         // let checkData ;
    //         const checkData =await  db.collection ('users').find({"userId" : parseInt(userId) }).toArray()
    //         return checkData;
    //     }

    // static checkEmail = async(email) => {
    //         // console.log('from model layer getemail' , email) 
    //        try{
    //             const db = getDb();
    //             const emailData = await db.collection('users') .find({"email" : email}) .toArray()
    //             return emailData;
            
            
    //        }
    //        catch(err){
    //         console.log(err)
    //         return err;
    //        }
            
    //     }
    //above code is the seperate function for checking the userid and email
//here we write the two checks in a single function
    static checkExistUser = async(userId,email) => {
                const db = getDb();
                // let checkData ;
                const checkData =await  db.collection ('users').findOne({$or: [ {"userId" : parseInt(userId) }, {"email" : email} ]})
                return checkData;
            }



    static fetchAll = async() => {
                    try{
                    const  db= getDb();
                    const getData = await   db.collection('users') .find() .toArray()
                    console.log(getData)
                    return getData;
                    }
            
                    catch(err) {
                        console.log(err)
                        return err;
                    }
                   
                  }
                

    static fetchById = async(userId) => {
    try {
           const db = getDb();
           const userById = await db.collection('users')  .find({"userId" : parseInt(userId) }) .next()
           console.log(userById);
           return userById;
             } 
                    
    catch (err) {
                console.log(err)
                return err;
                    }
     }

     static deleteById = async(userId) =>{
        try {
            const db = getDb() ;
            const deleteUser = await db.collection('users') .findOneAndDelete({"userId" : parseInt(userId)}) 
            return deleteUser;
        } 
        catch (err) {
            console.log(err)
        }
     }


     static updateUsers = async(userId ,updatedFirstName,updatedLastName) => {
        try {
           const db = getDb();
           const filterQuery = {"userId" : parseInt(userId)}
           const setQuery = {};
           if(updatedFirstName) {
            setQuery.firstName = updatedFirstName
           }
           if(updatedLastName) {
            setQuery.lastName = updatedLastName
           }
        //    const userUpdate = await db.collection('users') .updateOne({"userId" : parseInt(userId)},{$set : {userId : userId , firstName:updatedFirstName , lastName:updatedLastName, email: updatedEmail}}) 
           const updateQuery = {$set : setQuery}
           const userUpdate = await db.collection('users').updateOne(filterQuery, updateQuery);
           return (userUpdate)
           
        } 
        catch (err) {
           console.log(err) 
        }
     }



   
}

   



      
      
