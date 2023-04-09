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
    
    //save academic year into admin profile
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicYear.push(academicYearCreated);
    await admin.save();

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

//@desc Updates a single academic years stored in database
// PUT /api/v1/academic-years/:id
//@private
exports.updateAcademicYear = AsyncHandler(async(req, res)=>{
    //grab parameters from the request object
    const {name, fromYear, toYear, createdBy} = req.body; 
    //check if name of academic year exists already
    const academicYear = await AcademicYear.findOne({name});
    if(academicYear){
        throw new Error('Academic Year with that name already exists');
    }
    //use the url path to find Academic Year in the database
    const academicYearUpdated = await AcademicYear.findByIdAndUpdate(req.params.id, {
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id

    },
    {
        new: true
    });
    res.status(201).json({
        status: "Success",
        message: "Academic Year was successfully updated",
        data: academicYearUpdated
    });

});


//@desc Deletes a single academic years stored in database
// DELETE /api/v1/academic-years/:id
//@private
exports.deleteAcademicYear = AsyncHandler(async(req, res)=>{

    const academicYearToDelete = await AcademicYear.findById(req.params.id);

    if(!academicYearToDelete){
        throw new Error('Academic Year could not be found');
    }
    await AcademicYear.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "Success",
        message: "Academic Year deleted successfully"
    })
});