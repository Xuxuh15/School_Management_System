const express = require('express');
//middleware that checks if user is logged in
const isLoggedIn = require('../../middleware/isLoggedIn');
const isLoggedInTeacher = require('../../middleware/isLoggedInTeacher');
const isTeacher = require('../../middleware/isTeacher'); 
//middleware checks if user is an Admin
const isAdmin = require('../../middleware/isAdmin'); 
const {createExam, getExams, getExam, updateExam, deleteExam} = require('../../controller/Academics/examCtrl');


//create new exam router
const examRouter = express.Router();


examRouter.route('/')
//teacher create exam
.post(isLoggedInTeacher, isTeacher, createExam)
//get all exams
.get(isLoggedInTeacher, isTeacher, getExams)


examRouter.route('/:id')
//get single exam
.get(isLoggedInTeacher, isTeacher,getExam)
//update exam
.put(isLoggedInTeacher, isTeacher, updateExam)
//delete exam
.delete(isLoggedInTeacher, isTeacher,deleteExam)






module.exports = examRouter; 

