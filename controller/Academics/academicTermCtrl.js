const AsyncHandler = require('express-async-handler');
const AcademicTerm = require('../../model/Academics/AcademicTerm');
const Admin = require('../../model/Staff/Admin');




//@desc Creates a new academic term and stores it in database
// POST /api/v1/academic-terms
//@private
exports.createAcademicTerm = AsyncHandler(async(req, res)=>{
    //grab parameters from request body
    const {name, description, duration} = req.body; 

    const academicTerm = await AcademicTerm.findOne({name});
    //check if academic term already exists
    if(academicTerm){
        throw new Error('Academic Term already exists');
    }
    //create new academic term
    const academicTermCreated = await AcademicTerm.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id
    });
    //save academic term created to admin profile
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicTerm.push(academicTermCreated.id);
    await admin.save();

    res.status(201).json({
        status: "Success",
        message: "Academic term successfully created",
        data: academicTermCreated
    });
});

//@desc Fetches all academic terms from database
// GET /api/v1/academic-terms
//@private
exports.getAcademicTerms = AsyncHandler(async(req, res)=>{
    //retreive academic terms from database
    const academicTerms = await AcademicTerm.find();

    res.status(201).json({
        status: "Successful",
        message: "Academic terms retrieved successfully",
        data: academicTerms
    });
});

