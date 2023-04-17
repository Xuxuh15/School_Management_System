const express = require('express');
//middleware that checks if user is logged in
const isLoggedIn = require('../../middleware/isLoggedIn');
const isLoggedInTeacher = require('../../middleware/isLoggedInTeacher');
const isTeacher = require('../../middleware/isTeacher'); 
//middleware checks if user is an Admin
const isAdmin = require('../../middleware/isAdmin'); 
const {createExam, getExams} = require('../../controller/Academics/examCtrl');


//create new exam router
const examRouter = express.Router();

//teacher create exam
examRouter.post('/', isLoggedInTeacher, isTeacher, createExam); 

//fetch all exams
examRouter.get('/', isLoggedInTeacher, isTeacher, getExams);





module.exports = examRouter; 

