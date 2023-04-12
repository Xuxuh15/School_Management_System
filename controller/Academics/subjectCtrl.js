const AsyncHandler = require('express-async-handler');
const Subject = require('../../model/Academics/Subject');
const Admin = require('../../model/Staff/Admin');
const Program = require('../../model/Academics/Program');

//@desc Creates a new program and stores it in database
// POST /api/v1/subjects/:programID
//@access private
exports.createSubject = AsyncHandler(async(req, res)=>{
    //grab parameters from request object
    const {name,description,academicTerm} = req.body; 
    //see if program exists
    const programFound = await Program.findById(req.params.programID);
    if(!programFound){
        throw new Error('Program not found');
    }
    //check if subject already exists
    const subject = await Subject.findOne({name});
    if(subject){
        throw new Error('Subject already exists');
    }
    //create new subject
    const subjectCreated = await Subject.create({
        name,
        description,
        academicTerm,
        createdBy: req.userAuth._id
    });
    //push subject into programs model
    programFound.subjects.push(subjectCreated._id);
    //save 
    programFound.save(); 
    res.status(201).json({
        status: "Success",
        message: "Subject successfully created",
        data: subjectCreated
    }); 
      
});


//@desc Fetches all subjects stored in database
// GET /api/v1/subjects
//@access private
exports.getSubjects = AsyncHandler(async (req, res)=>{
    const subjects = await Subject.find();

    res.status(200).json({
        status: "Successs",
        message: "Subjects successfully fetched",
        data: subjects
        
    });
});

//@desc Fetches a single subject stored in database
// GET /api/v1/subjects/:id
//@acess private
exports.getSubject = AsyncHandler( async(req, res)=>{
    const subjectFound = await Subject.findById(req.params.id);

    if(subjectFound){
        res.status(200).json({
            status: "Successs",
            message: "Subject successfully fetched",
            data: subjectFound
            
        });
    }
    else{
        throw new Error('Subject could not be found. Chekck id and try again');
    }

})

//@desc Updates a single subject stored in database
// PUT /api/v1/subjects/:id
//@acess private
exports.updateSubject = AsyncHandler(async(req, res)=>{
    //grab parameters from the request object
    const {name,description,academicTerm} = req.body; 

    //check if name of subject exists already
    const subject = await Subject.findOne({name});
    if(subject){
        throw new Error('Subject with that name already exists');
    }
    //use the url path to find subject in the database
    const subjectUpdated = await Subject.findByIdAndUpdate(req.params.id,{
        name,
        description,
        academicTerm,
        createdBy: req.userAuth._id
    },
    {
        new: true
    })
    if(subjectUpdated){
        res.status(201).json({
            status: "Success",
            message: "Subject was successfully updated",
            data: subjectUpdated
        });
    }
    else{
        throw new Error('Subject could not be found');
    }

});


//@desc Deletes a single subject stored in database
// DELETE /api/v1/subject/:id
//@acess private
exports.deleteSubject = AsyncHandler(async(req, res)=>{

    const subjectToDelete = await Subject.findById(req.params.id);

    if(!subjectToDelete){
        throw new Error('Subject could not be found');
    }
    await Subject.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "Success",
        message: "Subject deleted successfully"
    });
});