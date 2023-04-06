const express = require('express'); 

//academicYearRouter call back functions
const {createAcademicYear, fetchAllAcademicYears} = require('../../controller/Academics/academicYearCtrl');

//middlewares
//checks if user is logged in
const isLoggedIn = require('../../middleware/isLoggedIn');
//checks if user is a admin
const isAdmin = require('../../middleware/isAdmin');

//initiate new instance of express Router. Will handle requests regarding academic years
const academicYearRouter = express.Router();

//create a new academic year
academicYearRouter.post("/", isLoggedIn, isAdmin,  createAcademicYear);

//fetch all academic years
academicYearRouter.get("/", isLoggedIn, isAdmin, fetchAllAcademicYears );

module.exports = academicYearRouter;


