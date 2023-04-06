const AsyncHandler = require('express-async-handler');
const AcademicYear = require('../../model/Academics/AcademicYear');
const Admin = require('../../model/Staff/Admin');

//@desc Creates a new academic year and stores it in database
// POST /api/v1/academic-years
//@private
exports.createAcademicYear = AsyncHandler(async(req, res)=>{
    const {name, fromYear, toYear, createdBy} = req.body; 
    res.status(201).json({
        status: "success",
        data: '',
        message: "Academic Year successfully created"
    });
});


//@desc Fetches all academic years stored in database
// GET /api/v1/academic-years
//@private
exports.fetchAllAcademicYears = AsyncHandler(async (req, res)=>{
    const data = await AcademicYear.find({});

    res.status(200).json({
        status: "Successs",
        data: data,
        message: "Academic years successfully fetched"
    })
});