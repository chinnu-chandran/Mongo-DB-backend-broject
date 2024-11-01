const user = require('../models/user')

const bcrypt = require('bcryptjs');

exports.userCreate = async (userId,firstName, lastName, email, password, type, phone  ) => {
    console.log('service layer wrkng')
    // console.log('service layer fstname', firstName)
    // console.log('service layer lstname', lastName)
    // console.log('service layer email', email)

try {

    const existUser = await user.checkExistUser(userId,email)
    // const existEmail = await user.checkEmail(email)
    if(existUser){
        console.log(existUser);
        return {"message" : " User or mailid already exists"}
    }
    else {
        //Here we cant pass data directly to the save function bcz its not a static method 
        //so we create a new constant and pass parameters into that constant 
        const newUser = new user(userId,firstName, lastName, email, password, type, phone)
        const newUserData =  await newUser.save();
        // console.log('service layer userdata' , newUserData)
         return newUserData ;  
    }
    
}
catch(err) {
    console.log(err)
    return err;
}

}


exports.userLogin = async(email, password) =>{
    // console.log('service layer working')
    
    try {
        const loginDatas = await user.postUserLogin(email, password)
        return loginDatas;  
    } 
    
    catch (error) {
      console.log(err)  
    }
    
    
    }


// exports.getLoginUser = async() =>{
//     try {
//         const getLoginData = await user.getUserLogin()
//         return getLoginData;
//     } 
//     catch (err) {
//       console.log(err)  
//     }
// }    
 

exports.getAllUser = async () => {
    // console.log('from sevice layer getuser')
    // console.log('service layer getuser', firstName)
    try{
        const userDetails = await user.fetchAll()
        console.log('service layer get user')
        console.log(userDetails);
        return userDetails;
    }

    catch (err) {
        console.log(err)
        return err;
    }
}

exports.getUserId = async(userId) => {
    // console.log('hi')
    try {
        const existUser = await user.checkExistUser(userId)

    //    console.log(userIdData)
    //    return useridData;
    //Here we check the given userid is existing or not.if exists it fetch the user
    if(existUser) {
        const fetchUser = await user.fetchById(userId)
        console.log(fetchUser)
        return fetchUser;
    }
    else {
        return ({"message" : "User doesnt exist"})
    }
    } 
    
    catch (err) {
        console.log(err)
        return err;
        
    }
}

exports.updateUserDetails = async(userId,updatedFirstName,updatedLastName,updatedEmail) => {
 try {
    const updateData = await user.updateUsers(userId,updatedFirstName,updatedLastName,updatedEmail)
    return updateData;
 } catch (err) {
    console.log(err)
 }
}

exports.deleteUser = async(userId) =>{
    try {
    //     console.log('from service layer')
    //     const existUser = await user.checkExistUser(userId,email)

    // if(existUser.length > 0){
        const dataDelete = await user.deleteById(userId);
        console.log('Delete operation result:', dataDelete);
        return dataDelete;
       
    } 
    catch (err) {
      console.log(err) 
      return {"message" : "user doesnt exists"}
 
    }
 }

    


// module.exports = userCreate;