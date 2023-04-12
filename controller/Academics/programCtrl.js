const AsyncHandler = require('express-async-handler');
const Program = require('../../model/Academics/Program');
const Admin = require('../../model/Staff/Admin');

//@desc Creates a new program and stores it in database
// POST /api/v1/programs
//@access private
exports.createProgram = AsyncHandler(async(req, res)=>{
    const {name, description,duration} = req.body; 
    const program = await Program.findOne({name});
    //check if program exists already
    if(program){
        throw new Error('Program already exists');
    }

    //create new program
    const programCreated = await Program.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id
    });
    
    //save program into admin profile
    const admin = await Admin.findById(req.userAuth._id);
    admin.programs.push(programCreated);
    await admin.save();

    res.status(201).json({
        status: "Success",
        message: "Program successfully created",
        data: programCreated
    });
});


//@desc Fetches all programs stored in database
// GET /api/v1/programs
//@access private
exports.getPrograms = AsyncHandler(async (req, res)=>{
    const programs = await Program.find();

    res.status(200).json({
        status: "Successs",
        message: "Programs successfully fetched",
        data: programs
        
    });
});

//@desc Fetches a single program stored in database
// GET /api/v1/programs/:id
//@acess private
exports.getProgram = AsyncHandler( async(req, res)=>{
    const programFound = await Program.findById(req.params.id).populate("subjects");

    if(programFound){
        res.status(200).json({
            status: "Successs",
            message: "Program successfully fetched",
            data: programFound
            
        });
    }
    else{
        throw new Error('Program could not be found. Chekck id and try again');
    }

})

//@desc Updates a single program stored in database
// PUT /api/v1/programs/:id
//@acess private
exports.updateProgram = AsyncHandler(async(req, res)=>{
    //grab parameters from the request object
    const {name,description,duration} = req.body; 
    //check if name of program exists already
    const program = await Program.findOne({name});
    if(program){
        throw new Error('Program with that name already exists');
    }
    //use the url path to find Program in the database
    const programUpdated = await Program.findByIdAndUpdate(req.params.id, {
        name,
        description,
        duration,
        createdBy: req.userAuth._id

    },
    {
        new: true
    });
    res.status(201).json({
        status: "Success",
        message: "Program was successfully updated",
        data: programUpdated
    });

});


//@desc Deletes a single academic years stored in database
// DELETE /api/v1/academic-years/:id
//@acess private
exports.deleteProgram = AsyncHandler(async(req, res)=>{

    const programToDelete = await Program.findById(req.params.id);

    if(!programToDelete){
        throw new Error('Academic Year could not be found');
    }
    await Program.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "Success",
        message: "Program deleted successfully"
    })
});