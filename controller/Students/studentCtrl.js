const AsyncHandler = require('express-async-handler');
const Student = require('../../model/Academics/Student');
const Admin = require('../../model/Staff/Admin');
const {hashPassword, isMatched} = require('../../utils/helpers');
const generateToken = require('../../utils/generateToken');
const Exam = require('../../model/Academics/Exam');
const ExamResult = require('../../model/Academics/ExamResults');


//@desc Admin register student
// POST /api/v1/students/admin/register
//@access Private only admin


exports.adminRegisterStudent = AsyncHandler(async(req,res)=>{
     //grab parameters from request body
     const {name, email, password} = req.body; 

     const hashedPassword = await hashPassword(password); 
     //check if student exists already
     const student = await Student.findOne({email}); 
 
     if(student){
         throw new Error('Student already exists');
     }
     //create teacher 
     const studentCreated = await Student.create({
         name,
         email,
         password: hashedPassword,
         createdBy: req.userAuth._id
     }); 
     //push to Admin 
     const admin = await Admin.findById(req.userAuth._id); 
     admin.students.push(studentCreated); 
     //save
     await admin.save(); 
     res.status(201).json({
         status: "Success",
         message: "Student successfully registered",
         data: studentCreated
     });
}); 


//@desc Student login
// POST /api/v1/students/login
//@access Public students 

exports.loginStudent = AsyncHandler(async(req, res)=>{
     //grabl credentials from request object
     const {email,password} = req.body; 
     //check if teacher exists
     const studentFound = await Student.findOne({email}); 
 
     if(!studentFound){
         res.json({message: 'Invalid login credentials'});
     }
 
     const passwordVerified = await isMatched(password,studentFound?.password); 
 
     if(!passwordVerified){
         res.json({ message: 'Invalid login credentials'}); 
     }
     res.status(200).json({
         status: "Success",
         message: "Student has been successfully logged in",
         data: generateToken(studentFound?.id)
     }); 
})

//@desc Get student profile
// GET /api/v1/students/profile
//@access Private students only
exports.getStudentProfile = AsyncHandler(async(req, res)=>{
    const studentProfile = await Student.findById(req.userAuth?._id); 

    if(!studentProfile){
        throw new Error('Student not found');
    }

    res.status(200).json({
        status: "Success",
        message: "Student file feteched successfully",
        data: studentProfile
    });

});

//@desc Admin fetch all students
// GET /api/v1/students/admin
//@access Private admins only
exports.adminFetchAllStudents = AsyncHandler(async(req,res)=>{
    //fetch all students
    const students = await Student.find(); 

    res.status(200).json({
        status: "Success",
        message: "Students fetched successfully",
        data: students
    });

});

//@desc Admin fetch single student
// GET /api/v1/students/:studentID/admin
//@access Private admins only
exports.adminGetSingleStudent = AsyncHandler(async(req,res)=>{
    //see if student exists
    const studentFound = await Student.findById(req.params.studentID);

    if(!studentFound){
        throw new Error('Student not found');
    }

    res.status(200).json({
        status: "Success",
        message: "Student profile successfully fetched",
        data: studentFound
    });
});

//@desc Student update their profile
// PUT /api/v1/students/update
//@access Private only students

exports.updateStudentProfile = AsyncHandler(async(req,res)=>{
    //grab paramters from request body
    const {email,password} = req.body; 
    //check if student with email already exists
    const studentFound = await Student.findOne({email});

    if(studentFound){
        throw new Error('Student already exists'); 
    } 
    //if user is updating password
    if(password){
        const studentUpdated = await Student.findByIdAndUpdate(req.userAuth._id,{
            email,
            password: await hashPassword(password)
        },
        {
            new: true,
            runValidators: true
        }); 
        res.status(201).json({
            status: "Success",
            message: "Student successfully updated",
            data: studentUpdated
        });
    }
    else{
        const studentUpdated = await Student.findByIdAndUpdate(req.userAuth._id,{
            email
        },
        {
            new: true,
        }); 
        res.status(201).json({
            status: "Success",
            message: "Student successfully updated",
            data: studentUpdated
        });
    }

});



//@desc Admin update student profile e.g. Assigning classes...
// PUT /api/v1/students/:studentID/update/admin
//@access Private only admins

exports.adminUpdateStudent = AsyncHandler(async(req, res)=>{
    //grab data from request body
    const {classLevels, academicYear, program, name, email, prefectName} = req.body; 


    //check if student with id exists
    const studentFound = await Student.findById(req.params.studentID); 
    if(!studentFound){
        throw new Error('Student could not be found'); 
    }
    //check if student exists already
    const studentToUpdate = await Student.findOne({email}); 

    if(studentToUpdate){
        throw new Error('Student already exists'); 
    }


    const studentUpdated = await Student.findByIdAndUpdate(req.params.studentID, {$set: {
         academicYear, 
         program, 
         name, 
         email, 
         prefectName
    },
    $addToSet: {
        classLevels,
    }},
    {
        new: true
    });

    res.status(200).json({
        status: "Success",
        message: "Student successfully updated",
        data: studentUpdated
    });
});

//@desc Student takes exam
// PUT /api/v1/students/exams/:examID/write
//@access Private only students

exports.writeExam = AsyncHandler(async(req,res)=>{
    //get the student taking exam
    const studentFound = await Student.findById(req.userAuth?._id);
    //if no student throw error
    if(!studentFound){
        throw new Error('Student not found');
    }
    //grab exam
    const examFound = await Exam.findById(req.params.examID).populate('questions'); 
    //check if exam exists
    if(!examFound){
        throw new Error('Exam not found. Check ID and try again');
    }
    //check if exam has been completed already
    const examResultsFound = await ExamResult.findOne({
        student: studentFound?._id, 
    });
    if(examResultsFound){
        throw new Error('Exam has already been completed');
    }

    //grab questions from exam object
    const questions = examFound?.questions; 
    if(!questions){
        throw new Error('No questions found')
    }
    //grab answers from request body
    const studentAnswers = req.body.answers; 

    //check if student answered all questions
    if(questions.length !== studentAnswers.length){
        throw new Error('Student must answer all questions before submitting exam'); 
    }


    //build report object
    let answeredQuestions = [];
    let correctAnswers = 0;
    let wrongAnswers = 0; 
    let score = 0; 
    let totalQuestions = 0;
    let grade = 0; 
    let status = ''; //whether student passed or failed
    let remarks ='';

    //get score
    for(i=0; i<questions.length; i++){
        //grab next question in array
        const question = questions[i]; 
        if(question.correctAnswer === studentAnswers[i]){
            correctAnswers++;
            score++;
            question.isCorrect = true; 
        }
        else{
            wrongAnswers++; 
        }

    }

    //calculate report
    totalQuestions = questions.length; 
    grade = (correctAnswers/totalQuestions) * 100; 
    grade = grade.toFixed(2); 
    answeredQuestions = questions.map(question=>{
        return {
            question: question.question,
            correctAnswer: question.correctAnswer,
            isCorrect: question.isCorrect
        }

    }); 

    //calculate status
    if(grade <= 50){
        status = 'Failed'
    }
    else{
        status = 'Passed'
    }

    if(grade >= 80){
        remarks = 'Excellent';
    }
    else if(grade >= 70){
        remarks = 'Very Good';
    }
    else if(grade >= 60){
        remarks = 'Good';
    }
    else if(grade >= 50){
        remarks = 'Fair';
    }
    else{
        remarks = 'Improvement Needed'
    }

    //create new result
    const examResults = await ExamResult.create({
        student: studentFound?._id,
        exam: examFound?._id,
        grade,
        score,
        status,
        remarks,
        classLevel: examFound?.classLevel,
        academicTerm: examFound?.academicTerm,
        academicYear: examFound?.academicYear,
    });

    //push exam results into student object

    studentFound.examResults.push(examResults); 
    //save
     await studentFound.save(); 


    res.status(200).json({
        status: "Success",
        message: "Exam has been completed",
        data: examResults
    });
});

