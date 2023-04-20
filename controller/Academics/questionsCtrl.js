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

     //check if question exists

     const questionFound = await Question.findOne({question});
     if(questionFound){
      throw new Error('Question already exists'); 
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


//@desc Get all questions
// GET /api/v1/questions
//@acess Private only teachers

exports.getQuestions = AsyncHandler(async(req, res)=>{
   //fetch all questions
   const questions = await Question.find(); 

   res.status(200).json({
      status: "Success",
      message: "Questions fetched successfully",
      data: questions
   });
});

//@desc Get single questions 
// GET /api/v1/questions/:questionID
//@acess Private only teachers

exports.getQuestion = AsyncHandler(async(req,res)=>{
   //fetch question
   const question = await Question.findById(req.params.questionID); 
   if(!question){
      throw new Error('Question could not be found');
   }
   res.status(200).json({
      status: "Success",
      message: "Question was feteched successfully",
      data: question
   });
});

//@desc Update single questions 
// PUT /api/v1/questions/:questionID
//@acess Private only teachers
exports.updateQuestion = AsyncHandler(async(req,res)=>{
   //grab data from request body
   const {question, optionA,optionB,optionC, optionD,correctAnswer} = req.body;
   

   //check if question exists
   const questionFound = await Question.findOne({question});

   if(questionFound){
      throw new Error('Question exists already');
   }
   //update question
   const questionUpdated = await Question.findByIdAndUpdate(req.params.questionID,{
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      createdBy: req.userAuth._id
   },
   {
      new: true,
   });

   if(!questionUpdated){
      throw new Error('Question could not be updated. Check id and try again');
   }
   
   res.status(201).json({
      status: "Success",
      message: "Question updated successfully",
      data: questionUpdated
   });
});

//@desc Deletes single questions 
// DELETE /api/v1/questions/:questionID
//@acess Private only teachers

exports.deleteQuestion = AsyncHandler(async(req,res)=>{
   //check if question exists
   const questionToDelete = await Question.findById(req.params.questionID);

   if(!questionToDelete){
      throw new Error('Could not delete question. Check ID and try again'); 
   }

   await Question.findByIdAndDelete(req.params.questionID); 

   res.status(200).json({
      status: "Success",
      message: "Question has been successfully deleted"
   });
}); 






