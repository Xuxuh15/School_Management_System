const express = require('express'); 

//academicYearRouter call back functions
const {createAcademicYear, getAcademicYears, getSingleAcademicYear, updateAcademicYear} = require('../../controller/Academics/academicYearCtrl');

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
academicYearRouter.get("/", isLoggedIn, isAdmin, getAcademicYears );

//fetch academic year by id
academicYearRouter.get("/:id", isLoggedIn, isAdmin, getSingleAcademicYear);

//update a academic year by id
academicYearRouter.put("/:id", isLoggedIn, isAdmin, updateAcademicYear);

module.exports = academicYearRouter;


