const AsyncHandler = require('express-async-handler');
const ClassLevel = require('../../model/Academics/ClassLevel');
const Admin = require('../../model/Staff/Admin');


//@desc Create a new class level and stores it in database
// POST /api/v1/class-levels
//@access private
exports.createClassLevel = AsyncHandler(async(req, res)=>{
    const {name,description} = req.body; 
    //check if class level exists alreayd

    const classLevel = await ClassLevel.findOne({name});

    if(classLevel){
        throw new Error('Class level already exists'); 
    }
    //create new class level
    const classLevelCreated = await ClassLevel.create({
        name,
        description,
        createdBy: req.userAuth._id
    }); 

    //push new class level into admin profile
    const admin = await Admin.findById(req.userAuth._id);
    admin.classLevel.push(classLevelCreated._id); 
    //save
    await admin.save();

    res.status(201).json({
        status: "Success",
        message: "Class level successfully created",
        data: classLevelCreated
    });

});

//@desc Fetches all classes from database
// GET /api/v1/class-levels
//@access private
exports.getClassLevels = AsyncHandler(async(req,res)=>{
    //fetch classes from the database
    const classLevels = await ClassLevel.find(); 

    res.status(200).json({
        status: "Success",
        message: "Classes successfully retrieved",
        data: classLevels
    }); 

});

//@desc Fetches a single classes from database
// GET /api/v1/class-levels/:id
//@access private

exports.getClassLevel = AsyncHandler(async(req, res)=>{
    //retrieve class level
    const classFound = await ClassLevel.findById(req.params.id); 
    //check if class level exists
    if(classFound){
        res.status(200).json({
            status: "Success",
            message: "Class successfully retrieved",
            data: classFound
        }); 
    }
    else{
        throw new Error('Class could not be found');
    }

});

//@desc Updates a single classes from database
// PUT /api/v1/class-levels/:id
//@access private

exports.updateClassLevel = AsyncHandler(async(req,res)=>{
    //grab name and description from request object
    const {name, description} = req.body; 
    //check if class level exists already
    const classLevel = await ClassLevel.findOne({name});

    if(classLevel){
        throw new Error('Class already exists');
    }
    //update class level
    const classLevelUpdated = await ClassLevel.findByIdAndUpdate(req.params.id,{
        name,
        description,
        createdBy: req.userAuth._id
    },
    {
        new: true
    })
    console.log(classLevelUpdated);
    res.status(201).json({
        status: "Success",
        message: "Class successfully updated",
        data: classLevelUpdated
    });
});

//@desc Deletes a single classes from database
// DELETE /api/v1/class-levels/:id
//@access private
exports.deleteClassLevel = AsyncHandler(async(req,res)=>{
    //check if class level exists
    const classToDelete = await ClassLevel.findById(req.params.id);
    //if class does not exist, throw error
    if(!classToDelete){
        throw new Error('Could not find class');
    }

    await ClassLevel.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "Success",
        message: "Class successfully deleted"
    }); 
});
