const AsyncHandler = require('express-async-handler');
const YearGroup = require('../../model/Academics/YearGroup');
const Admin = require('../../model/Staff/Admin');


//@desc Creates a new year group and stores it in database
// POST /api/v1/year-groups
//@access private
exports.createYearGroup = AsyncHandler(async(req, res)=>{
    //grab parameters from request object
    const {name,academicYear} = req.body; 
    //check if year group already exists
    const yearGroupFound = await YearGroup.findOne({name});
    if(yearGroupFound){
        throw new Error('Year group already exists');
    }
    //create new subject
    const yearGroupCreated = await YearGroup.create({
        name,
        academicYear,
        createdBy: req.userAuth._id
    });
    //search for admin
    const admin = await Admin.findById(req.userAuth._id);
    if(!admin){
        throw new Error('Admin not found'); 
    }
    //push year group into programs model
    admin.yearGroups.push(yearGroupCreated._id);
    //save 
    admin.save(); 
    res.status(201).json({
        status: "Success",
        message: "Year group successfully created",
        data: yearGroupCreated
    }); 
      
});


//@desc Fetches all year groups stored in database
// GET /api/v1/year-groups
//@access private
exports.getYearGroups = AsyncHandler(async (req, res)=>{
    const yearGroups = await YearGroup.find();

    res.status(200).json({
        status: "Successs",
        message: "Year groups successfully fetched",
        data: yearGroups
        
    });
});

//@desc Fetches a single subject stored in database
// GET /api/v1/year-groups/:id
//@acess private
exports.getYearGroup = AsyncHandler( async(req, res)=>{
    const yearGroupFound = await YearGroup.findById(req.params.id);

    if(yearGroupFound){
        res.status(200).json({
            status: "Successs",
            message: "Year group successfully fetched",
            data: yearGroupFound
            
        });
    }
    else{
        throw new Error('Subject could not be found. Chekck id and try again');
    }

})

//@desc Updates a single year group stored in database
// PUT /api/v1/year-groups/:id
//@acess private
exports.updateYearGroup = AsyncHandler(async(req, res)=>{
    //grab parameters from the request object
    const {name,academicYear} = req.body; 

    //check if name of subject exists already
    const yearGroup = await YearGroup.findOne({name});
    if(yearGroup){
        throw new Error('Year group with that name already exists');
    }
    //use the url path to find subject in the database
    const yearGroupUpdated = await YearGroup.findByIdAndUpdate(req.params.id,{
        name,
        academicYear,
        createdBy: req.userAuth._id
    },
    {
        new: true
    })
    if(yearGroupUpdated){
        res.status(201).json({
            status: "Success",
            message: "Year group was successfully updated",
            data: yearGroupUpdated
        });
    }
    else{
        throw new Error('Subject could not be found');
    }

});


//@desc Deletes a single year group stored in database
// DELETE /api/v1/year-groups/:id
//@acess private
exports.deleteYearGroup = AsyncHandler(async(req, res)=>{
    await YearGroup.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: "Success",
        message: "Year group deleted successfully"
    });
});