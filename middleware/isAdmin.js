//require Admin model---access to database
const Admin = require('../model/Staff/Admin');

//Restricts access to certain routes unless user is an admin

const isAdmin = async (req, res, next)=>{
    const userId = req?.userAuth?._id; 
    const userFound = await Admin.findById(userId);
    
    //check if user is an admin
    if(userFound?.role === "admin"){
        next();
    }
    else{
        next(new Error('Access Denied. Not an admin'));
    } 
}

module.exports = isAdmin; 