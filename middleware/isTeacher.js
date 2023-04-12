//require Teacher model---access to database
const Teacher = require('../model/Staff/Teacher');

//Restricts access to certain routes unless user is an teacher

const isTeacher = async (req, res, next)=>{
    const userId = req?.userAuth?._id; 
    const userFound = await Teacher.findById(userId);

    if(!userFound){
        throw new Error('User could not be found');
    }
    
    //check if user is a teacher
    if(userFound?.role === "teacher"){
        next();
    }
    else{
        next(new Error('Access Denied. Not a teacher'));
    } 
}

module.exports = isTeacher; 