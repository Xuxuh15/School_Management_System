const express = require('express'); 
//middleware that checks if user is logged in
const isLoggedIn = require('../../middleware/isLoggedIn');
const isLoggedInTeacher = require('../../middleware/isLoggedInTeacher');
//checks if user is a teacher
const isTeacher = require('../../middleware/isTeacher'); 
//middleware checks if user is an Admin
const isAdmin = require('../../middleware/isAdmin');
const { createQuestions } = require('../../controller/Academics/questionsCtrl');

const questionsRouter = express.Router();

//create new question
questionsRouter.post('/:examID', isLoggedInTeacher, isTeacher, createQuestions); 




module.exports = questionsRouter; 