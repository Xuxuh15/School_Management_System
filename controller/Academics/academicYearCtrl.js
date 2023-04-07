const AsyncHandler = require('express-async-handler');
const AcademicYear = require('../../model/Academics/AcademicYear');
const Admin = require('../../model/Staff/Admin');

//@desc Creates a new academic year and stores it in database
// POST /api/v1/academic-years
//@private
exports.createAcademicYear = AsyncHandler(async(req, res)=>{
    const {name, fromYear, toYear} = req.body; 
    const academicYear = await AcademicYear.findOne({name});
    //check if academic year exists already
    if(academicYear){
        throw new Error('Academic Year already exists');
    }

    //create new academic year
    const academicYearCreated = await AcademicYear.create({
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id
    });
    res.status(201).json({
        status: "success",
        message: "Academic Year successfully created",
        data: academicYearCreated
    });
});


//@desc Fetches all academic years stored in database
// GET /api/v1/academic-years
//@private
exports.getAcademicYears = AsyncHandler(async (req, res)=>{
    const academicYears = await AcademicYear.find();

    res.status(200).json({
        status: "Successs",
        message: "Academic years successfully fetched",
        data: academicYears
        
    });
});

//@desc Fetches a single academic years stored in database
// GET /api/v1/academic-years/:id
//@private
exports.getSingleAcademicYear = AsyncHandler( async(req, res)=>{
    const academicYearFound = await AcademicYear.findById(req.params.id);

    if(academicYearFound){
        res.status(200).json({
            status: "Successs",
            message: "Academic year successfully fetched",
            data: academicYearFound
            
        });
    }
    else{
        throw new Error('Academic Year could not be found. Chekck id and try again');
    }

})