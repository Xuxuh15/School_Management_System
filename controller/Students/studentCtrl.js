const AsyncHandler = require('express-async-handler');
const Student = require('../../model/Academics/Student');
const Admin = require('../../model/Staff/Admin');
const {hashPassword, isMatched} = require('../../utils/helpers');
const generateToken = require('../../utils/generateToken');


//@desc Admin register student
// POST /api/v1/students/admin/register
//@access Private only admin


exports.adminRegisterStudent = AsyncHandler(async(req,res)=>{
     //grab parameters from request body
     const {name, email, password} = req.body; 

     const hashedPassword = await hashPassword(password); 
     //check if student exists already
     const student = await Student.findOne({email}); 
 
     if(student){
         throw new Error('Student already exists');
     }
     //create teacher 
     const studentCreated = await Student.create({
         name,
         email,
         password: hashedPassword,
         createdBy: req.userAuth._id
     }); 
     //push to Admin 
     const admin = await Admin.findById(req.userAuth._id); 
     admin.students.push(studentCreated); 
     //save
     await admin.save(); 
     res.status(201).json({
         status: "Success",
         message: "Student successfully registered",
         data: studentCreated
     });
}); 


//@desc Student login
// POST /api/v1/students/login
//@access Public students 

exports.loginStudent = AsyncHandler(async(req, res)=>{
     //grabl credentials from request object
     const {email,password} = req.body; 
     //check if teacher exists
     const studentFound = await Student.findOne({email}); 
 
     if(!studentFound){
         res.json({message: 'Invalid login credentials'});
     }
 
     const passwordVerified = await isMatched(password,studentFound?.password); 
 
     if(!passwordVerified){
         res.json({ message: 'Invalid login credentials'}); 
     }
     res.status(200).json({
         status: "Success",
         message: "Student has been successfully logged in",
         data: generateToken(studentFound?.id)
     }); 
})

//@desc Get student profile
// GET /api/v1/students/profile
//@access Private students only
exports.getStudentProfile = AsyncHandler(async(req, res)=>{
    const studentProfile = await Student.findById(req.userAuth?._id); 

    if(!studentProfile){
        throw new Error('Student not found');
    }

    res.status(200).json({
        status: "Success",
        message: "Student file feteched successfully",
        data: studentProfile
    });

});

//@desc Admin fetch all students
// GET /api/v1/students/admin
//@access Private admins only
exports.adminFetchAllStudents = AsyncHandler(async(req,res)=>{
    //fetch all students
    const students = await Student.find(); 

    res.status(200).json({
        status: "Success",
        message: "Students fetched successfully",
        data: students
    });

});

//@desc Admin fetch single student
// GET /api/v1/students/:studentID/admin
//@access Private admins only
exports.adminGetSingleStudent = AsyncHandler(async(req,res)=>{
    //see if student exists
    const studentFound = await Student.findById(req.params.studentID);

    if(!studentFound){
        throw new Error('Student not found');
    }

    res.status(200).json({
        status: "Success",
        message: "Student profile successfully fetched",
        data: studentFound
    });
});

//@desc Student update their profile
// PUT /api/v1/students/update
//@access Private only students

exports.updateStudentProfile = AsyncHandler(async(req,res)=>{
    //grab paramters from request body
    const {email,password} = req.body; 
    //check if student with email already exists
    const studentFound = await Student.findOne({email});

    if(studentFound){
        throw new Error('Student already exists'); 
    } 
    //if user is updating password
    if(password){
        const studentUpdated = await Student.findByIdAndUpdate(req.userAuth._id,{
            email,
            password: await hashPassword(password)
        },
        {
            new: true,
            runValidators: true
        }); 
        res.status(201).json({
            status: "Success",
            message: "Student successfully updated",
            data: studentUpdated
        });
    }
    else{
        const studentUpdated = await Student.findByIdAndUpdate(req.userAuth._id,{
            email
        },
        {
            new: true,
        }); 
        res.status(201).json({
            status: "Success",
            message: "Student successfully updated",
            data: studentUpdated
        });
    }

});



//@desc Admin update student profile e.g. Assigning classes...
// PUT /api/v1/students/:studentID/update/admin
//@access Private only admins

exports.adminUpdateStudent = AsyncHandler(async(req, res)=>{
    //grab data from request body
    const {classLevels, academicYear, program, name, email, prefectName} = req.body; 


    //check if student with id exists
    const studentFound = await Student.findById(req.params.studentID); 
    if(!studentFound){
        throw new Error('Student could not be found'); 
    }
    //check if student exists already
    const studentToUpdate = await Student.findOne({email}); 

    if(studentToUpdate){
        throw new Error('Student already exists'); 
    }


    const studentUpdated = await Student.findByIdAndUpdate(req.params.studentID, {$set: {
         academicYear, 
         program, 
         name, 
         email, 
         prefectName
    },
    $addToSet: {
        classLevels,
    }},
    {
        new: true
    });

    res.status(200).json({
        status: "Success",
        message: "Student successfully updated",
        data: studentUpdated
    });
});