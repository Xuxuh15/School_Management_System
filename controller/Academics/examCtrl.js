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
        program
    } = req.body; 
    //push exam into teacher

    const teacherFound = await Teacher.findById(req.userAuth._id);
    if(!teacherFound){
        throw new Error('Could not find teacher'); 
    }

    //chekc if exam exists
    const examFound = await Exam.findOne({name});
    if(examExists){
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