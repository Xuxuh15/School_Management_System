const express = require('express');
//middleware that checks if user is logged in
const isLoggedIn = require('../../middleware/isLoggedIn');
const isLoggedInTeacher = require('../../middleware/isLoggedInTeacher');
const isTeacher = require('../../middleware/isTeacher'); 
//middleware checks if user is an Admin
const isAdmin = require('../../middleware/isAdmin'); 
const {registerTeacher, loginTeacher, getAllTeachersAdmin, 
    getTeacherAdmin, getProfileTeacher, recoverTeacherProfileAdmin, 
    updateTeacherProfile, updateTeacherProfileAdmin} = require('../../controller/Staff/teachersCtrl');



const teacherRouter = express.Router(); 


//Admin register teacher
teacherRouter.post('/admin/register', isLoggedIn, isAdmin, registerTeacher);

//Login teacher
teacherRouter.post('/login',loginTeacher);

//Admin get all teachers
teacherRouter.get('/admin', isLoggedIn, isAdmin, getAllTeachersAdmin); 

//Admin get teacher by id
teacherRouter.get('/:id/admin', isLoggedIn, isAdmin, getTeacherAdmin);

//get Teacher profile by id teacher
teacherRouter.get('/profile', isLoggedInTeacher, isTeacher, getProfileTeacher);

//teacher update their profile
teacherRouter.put('/update', isLoggedInTeacher, isTeacher, updateTeacherProfile);

//admin recover teacher profile
teacherRouter.put('/:teacherID/recover', isLoggedIn, isAdmin, recoverTeacherProfileAdmin);

//admin update teacher profile
teacherRouter.put('/:teacherID/admin', isLoggedIn, isAdmin, updateTeacherProfileAdmin);



module.exports = teacherRouter;


