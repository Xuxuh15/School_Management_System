const express = require('express');
//middleware that checks if user is logged in
const isLoggedIn = require('../../middleware/isLoggedIn');
const isLoggedInTeacher = require('../../middleware/isLoggedInTeacher');
const isTeacher = require('../../middleware/isTeacher'); 
//middleware checks if user is an Admin
const isAdmin = require('../../middleware/isAdmin'); 


//create new exam router
const examRouter = express.Router();



module.exports = examRouter; 

