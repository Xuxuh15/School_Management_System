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

//@desc Fetches a single academic term from database
// GET /api/v1/academic-terms/:id
//@private
exports.getAcademicTerm = AsyncHandler(async(req, res)=>{
    const academicTermFound = await AcademicTerm.findById(req.params.id);

    if(academicTermFound){
        res.status(200).json({
            status: "Success",
            message: "Academic term successfully retrieved",
            data: academicTermFound
        });
    }
    else{
        throw new Error('Academic term could not be found');
    }

});

//@desc Updates a single academic term from database
// PUT /api/v1/academic-terms/:id
//@private
exports.updateAcademicTerm = AsyncHandler(async(req, res)=>{
    const {name, description, duration} = req.body; 

    const academicTermFound = await AcademicTerm.findOne({name});

    if(academicTermFound){
        throw new Error('Academic term already exists');
    }

    const academicTermToUpdate = await AcademicTerm.findByIdAndUpdate(req.params.id,
        {
            name,
            description,
            duration,
            createdBy: req.userAuth._id
        },
        {
            new: true
        }
        ); 
        res.status(201).json({
            status: "Success",
            message: "Academic term is successfully updated",
            data: academicTermToUpdate
        }); 

});

//@desc Deletes a single academic term from database
// DELETE /api/v1/academic-terms/:id
//@private
exports.deleteAcademicTerm = AsyncHandler(async(req, res)=>{
    //check if academic term exists
    const academicTermToDelete = await AcademicTerm.findById(req.params.id);
    if(!academicTermToDelete){
        throw new Error('Academic term does not exist');
    }
    //delete academic term
    await AcademicTerm.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "Success",
        message: "Academic term deleted successfully"
    });
});









