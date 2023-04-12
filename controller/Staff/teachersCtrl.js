const AsyncHandler = require('express-async-handler');
const Admin = require('../../model/Staff/Admin');
const Teacher = require('../../model/Staff/Teacher');
const {hashPassword, isMatched} = require('../../utils/helpers');
const generateToken = require('../../utils/generateToken');




//@desc Admin register a teacher
// POST /api/v1/teachers/admin/register
//@access Private
exports.registerTeacher = AsyncHandler(async(req, res)=>{
    //grab parameters from request body
    const {name, email, password} = req.body; 

    const hashedPassword = await hashPassword(password); 
    //check if teacher exists already
    const teacher = await Teacher.findOne({email}); 

    if(teacher){
        throw new Error('Teacher already exists');
    }
    //create teacher 
    const teacherCreated = await Teacher.create({
        name,
        email,
        password: hashedPassword,
        createdBy: req.userAuth._id
    }); 
    //push to Admin 
    const admin = await Admin.findById(req.userAuth._id); 
    admin.teachers.push(teacherCreated); 
    //save
    await admin.save(); 
    res.status(201).json({
        status: "Success",
        message: "Teacher successfully registered",
        data: teacherCreated
    });
});

//@desc Login teacher
// POST /api/v1/teachers/login
//@access Public
exports.loginTeacher = AsyncHandler(async(req,res)=>{
    //grabl credentials from request object
    const {email,password} = req.body; 
    //check if teacher exists
    const teacherFound = await Teacher.findOne({email}); 

    if(!teacherFound){
        res.json({message: 'Invalid login credentials'});
    }

    const passwordVerified = await isMatched(password,teacherFound?.password); 

    if(!passwordVerified){
        res.json({ message: 'Invalid login credentials'}); 
    }
    res.status(200).json({
        status: "Success",
        message: "Teacher has been successfully logged in",
        data: generateToken(teacherFound?.id)
    }); 
}); 

//@desc Get all teachers
// GET /api/v1/teachers/admin
//@access Private only admins

exports.getAllTeachersAdmin = AsyncHandler(async(req,res)=>{
    const teachers = await Teacher.find();
    res.status(200).json({
        status: "Success",
        message: "Teachers successfully fetched",
        data: teachers
    });
});

//@desc Admin get single teachers
// GET /api/v1/teachers/admin/:teacherID
//@access Private only admins
exports.getTeacherAdmin = AsyncHandler(async(req,res)=>{
    const teacher = await Teacher.findById(req.params.teacherID); 
    //check if teacher exists
    if(!teacher){
        throw new Error('Teacher does not exist');
    }
    res.status(200).json({
        status: "Success",
        message: "Teacher has been successfully fetched",
        data: teacher
    });
})

//@desc Teacher get profile
// GET /api/v1/teachers/profile
//@access Private only teachers

exports.getProfileTeacher = AsyncHandler(async(req,res)=>{
    const teacherProfile = await Teacher.findById(req.userAuth._id); 

    res.status(200).json({
        status: "Success",
        message: "Teacher profile feteched successfully",
        data: teacherProfile
    });

})


//@desc Teacher update their profile
// PUT /api/v1/teachers/update
//@access Private only teachers

exports.updateTeacherProfile = AsyncHandler(async(req,res)=>{
    //grab paramters from request body
    const {name,email,password} = req.body; 
    //check if teacher with email already exists
    const teacherFound = await Teacher.findOne({email});

    if(teacherFound){
        throw new Error('Teacher already exists'); 
    } 
    //if user is updating password
    if(password){
        const teacherUpdated = await Teacher.findByIdAndUpdate(req.userAuth._id,{
            name,
            email,
            password: await hashPassword(password)
        },
        {
            new: true,
            runValidators: true
        }); 
        res.status(201).json({
            status: "Success",
            message: "Teacher successfully updated",
            data: teacherUpdated
        });
    }
    else{
        const teacherUpdated = await Teacher.findByIdAndUpdate(req.userAuth._id,{
            name,
            email
        },
        {
            new: true,
        }); 
        res.status(201).json({
            status: "Success",
            message: "Teacher successfully updated",
            data: teacherUpdated
        });
    }

});

//@desc Admin update teacher profile
// PUT /api/v1/teachers/:teacherID/update
//@access Private only admin

exports.recoverTeacherProfileAdmin = AsyncHandler(async(req, res)=>{
    //grab paramters from request body
    const {name,email,password} = req.body; 
    //check if teacher with email already exists
    const teacherFound = await Teacher.findOne({email});

    if(teacherFound){
        throw new Error('Teacher already exists'); 
    } 
    //if user is updating password
    if(password){
        const teacherUpdated = await Teacher.findByIdAndUpdate(req.params.teacherID,{
            name,
            email,
            password: await hashPassword(password)
        },
        {
            new: true,
            runValidators: true
        }); 
        res.status(201).json({
            status: "Success",
            message: "Teacher successfully updated",
            data: teacherUpdated
        });
    }
    else{
        const teacherUpdated = await Teacher.findByIdAndUpdate(req.params.teacherID,{
            name,
            email
        },
        {
            new: true,
        }); 
        res.status(201).json({
            status: "Success",
            message: "Teacher successfully updated",
            data: teacherUpdated
        });
    }
});

//@desc Admin update teacher profile
// PUT /api/v1/teachers/:teacherID/admin
//@access Private only admin

exports.updateTeacherProfileAdmin = AsyncHandler(async(req,res)=>{
    //grab paramters from request body
    const {program, classLevel, academicYear, subject} = req.body; 

      //fetch teacher from database
      const teacherToUpdate = await Teacher.findById(req.params.teacherID); 
    if(!teacherToUpdate){
        throw new Error('Teacher not found'); 
    } 

    //check if teacher is withdrawn
    if(teacherToUpdate.isWithdrawn){
        throw new Error('Action Denied. Teacher is withdrawn'); 
    }

    //if program is provided, update teacher profile
    if(program){
        teacherToUpdate.program = program;
        await teacherToUpdate.save();
    }
    //if classlevel provided, update class level
    if(classLevel){
        teacherToUpdate.classLevel = classLevel;
        await teacherToUpdate.save();
    }
    //if academic year provided, update academic year
    if(academicYear){
        teacherToUpdate.academicYear = academicYear;
        await teacherToUpdate.save();
    }
    //if subject provided, update profile
    if(subject){
        teacherToUpdate.subject = subject;
        await teacherToUpdate.save();
    }

    res.status(200).json({
        status: "Success",
        message: "Fields successfully updated",
        data: teacherToUpdate
    }); 
      
});


