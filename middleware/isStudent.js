//require Teacher model---access to database
const Student = require('../model/Academics/Student');

//Restricts access to certain routes unless user is an teacher

const isStudent = async (req, res, next)=>{
    const userId = req?.userAuth?._id; 
    const userFound = await Student.findById(userId);

    if(!userFound){
        throw new Error('User could not be found');
    }
    
    //check if user is a teacher
    if(userFound?.role === "Student"){
        next();
    }
    else{
        next(new Error('Access Denied. Not a student'));
    } 
}

module.exports = isStudent; 