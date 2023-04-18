const verifyToken = require('../utils/verifyToken');
//require Admin model---access to database
const Student = require('../model/Academics/Student');

const isLoggedInStudent = async (req, res, next)=>{
    //get token from header
    const headerObj = req.headers; 
    //optional chaining 
    const token = headerObj?.authorization?.split(" ")[1];
    //verify token
    const verifiedToken = verifyToken(token);
    if(verifiedToken){ 
        //find Student --- exclude password in returned user
        const user = await Student.findById(verifiedToken.id).select('name email role');
        //saver user in request body 
        req.userAuth = user;
        //move onto next middleware
        next();   
    }
    //if the token is invalid, throw a error and pass it with next
    else{
        const err = new Error('Invalid token');
        next(err);
    } 
}

module.exports = isLoggedInStudent; 