const AsyncHandler = require('express-async-handler');
const Exam = require('../../model/Academics/Exam');
const Teacher = require('../../model/Staff/Teacher'); 



//@desc create exam
// POST /api/v1/exams
//@access Private
exports.createExam = AsyncHandler(async(req,res)=>{
    //grab paramters
    const {
        name,
        description,
        academicTerm,
        academicYear,
        classLevel,
        createdBy,
        duration,
        examDate,
        examStatus,
        examTime,
        examType,
        subject,
        program, 
    } = req.body; 
    //push exam into teacher

    const teacherFound = await Teacher.findById(req.userAuth._id);
    if(!teacherFound){
        throw new Error('Could not find teacher'); 
    }

    //chekc if exam exists
    const examFound = await Exam.findOne({name});
    if(examFound){
        throw new Error('Exam already exists');
    }
    

    //create
    const examCreated = await new Exam({
        name,
        description,
        academicTerm,
        academicYear,
        classLevel,
        createdBy,
        duration,
        examDate,
        examStatus,
        examTime,
        examType,
        subject,
        program,
        createdBy: req.userAuth?._id,
    }); 

    //push the exam into teacher
    teacherFound.examsCreated.push(examCreated._id);
    //save exam and teacher profile
    await examCreated.save(); 
    await teacherFound.save(); 

    res.status(201).json({
        status: "Success",
        message: "Exam was created successfully",
        data: examCreated
    });

});

//@desc Get all exams
// GET /api/v1/exams
//@access Private

exports.getExams = AsyncHandler(async(req,res)=>{
    //fetch all exams
    const exams = await Exam.find().populate({
        path: "questions",
        populate: {
            path: "createdBy"
        }
    });

    res.status(200).json({
        status: "Success",
        message: "Exams successfully fetched",
        data: exams
    });
}); 

//@desc Get single exam
// GET /api/v1/exams/:id
//@access Private

exports.getExam = AsyncHandler(async(req, res)=>{
    //find exam by id
    const examFound = await Exam.findById(req.params.id).populate('questions'); 

    if(!examFound){
        throw new Error('Exam could not be found');
    }

    res.status(200).json({
        status: "Success",
        message: "Exam successfully found",
        data: examFound
    });

})

//@desc Update exam
// PUT /api/v1/exams/:id
//@access Private

exports.updateExam = AsyncHandler(async(req,res)=>{
     //grab paramters
     const {
        name,
        description,
        academicTerm,
        academicYear,
        classLevel,
        createdBy,
        duration,
        examDate,
        examStatus,
        examTime,
        examType,
        subject,
        program, 
    } = req.body; 

    //check if exam exists already

    const examFound = await Exam.findOne({name}); 

    if(examFound){
        throw new Error('Exam already exists');
    }

    const examToUpdate = await Exam.findByIdAndUpdate(req.params.id,{
        name,
        description,
        academicTerm,
        academicYear,
        classLevel,
        createdBy,
        duration,
        examDate,
        examStatus,
        examTime,
        examType,
        subject,
        program,
        createdBy: req.userAuth._id 
    },
    {
        new: true
    });
    res.status(201).json({
        status: "Success",
        message: "Exam successfully updated",
        data: examToUpdate
    }); 
})

//@desc Delete exam
// DELETE /api/v1/exams/:id
//@access Private

exports.deleteExam = AsyncHandler(async(req,res)=>{
    //check if exam exists
    const examToDelete = await Exam.findById(req.params.id); 
    if(!examToDelete){
        throw new Error('Exam could not be found');
    }

    await Exam.findByIdAndDelete(req.params.id); 

    res.status(200).json({
        status: "Success",
        message: "Exam was successfully deleted"
    });
}); 


