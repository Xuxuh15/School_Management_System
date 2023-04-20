const express = require('express');
//middleware that checks if user is logged in
const isLoggedIn = require('../../middleware/isLoggedIn');
const isLoggedInStudent = require('../../middleware/isLoggedInStudent');
const isStudent = require('../../middleware/isStudent'); 
//middleware checks if user is an Admin
const isAdmin = require('../../middleware/isAdmin'); 
const {adminRegisterStudent,loginStudent, getStudentProfile, adminFetchAllStudents, adminGetSingleStudent, updateStudentProfile, adminUpdateStudent, writeExam} = require('../../controller/Students/studentCtrl');



const studentRouter = express.Router(); 


//Admin register teacher
studentRouter.post('/admin/register', isLoggedIn, isAdmin, adminRegisterStudent);

//Students login
studentRouter.post('/login', loginStudent); 

//Get student profile
studentRouter.get('/profile', isLoggedInStudent, isStudent, getStudentProfile);

//Admin get all students
studentRouter.get('/admin', isLoggedIn, isAdmin, adminFetchAllStudents);

//Admin get single student
studentRouter.get('/:studentID/admin', isLoggedIn, isAdmin, adminGetSingleStudent); 

//Student update profile
studentRouter.put('/update', isLoggedInStudent, isStudent, updateStudentProfile);

//admin update student profile
studentRouter.put('/:studentID/update/admin', isLoggedIn, isAdmin, adminUpdateStudent);

//student take exam
studentRouter.post('/exam/:examID/write', isLoggedInStudent, isStudent, writeExam);



module.exports = studentRouter;


