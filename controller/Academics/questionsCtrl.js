const AsyncHandler = require('express-async-handler');
const Question = require('../../model/Academics/Questions');
const Teacher = require('../../model/Staff/Teacher');
const Exam = require('../../model/Academics/Exam'); 



//@desc Create new questions for exam
// POST /api/v1/questions/:examID
//@acess Private only teachers

exports.createQuestions = AsyncHandler(async(req, res)=>{
    //grab data from request body
    const {
    question, 
    optionA,
    optionB, 
    optionC,
    optionD,
    correctAnswer
    } = req.body; 

    //check if exam exists
     const examFound = await Exam.findById(req.params.examID); 

     if(!examFound){
        throw new Error('Exam could not be found'); 
     }
     //create question
     const questionCreated = await Question.create({
    question, 
    optionA,
    optionB, 
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.userAuth?._id
     });

     //push question into exam questions array
     examFound.questions.push(questionCreated?._id); 
     //save
     await examFound.save(); 

     res.status(201).json({
        status: "Success",
        message: "Questios successfully added to exam",
        data: questionCreated
     }); 
});