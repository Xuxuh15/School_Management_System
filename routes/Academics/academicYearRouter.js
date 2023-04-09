const express = require('express'); 

//academicYearRouter call back functions
const {createAcademicYear, getAcademicYears, getSingleAcademicYear, updateAcademicYear, deleteAcademicYear} = require('../../controller/Academics/academicYearCtrl');

//middlewares
//checks if user is logged in
const isLoggedIn = require('../../middleware/isLoggedIn');
//checks if user is a admin
const isAdmin = require('../../middleware/isAdmin');

//initiate new instance of express Router. Will handle requests regarding academic years
const academicYearRouter = express.Router();

academicYearRouter
.route("/")
//create a new academic year
.post(isLoggedIn, isAdmin,  createAcademicYear)
//fetch all academic years
.get(isLoggedIn, isAdmin, getAcademicYears)



academicYearRouter
.route("/:id")
//fetch academic year by id
.get(isLoggedIn, isAdmin, getSingleAcademicYear)
//update a academic year by id
.put(isLoggedIn, isAdmin, updateAcademicYear)
//delete a academic year by id
.delete(isLoggedIn, isAdmin, deleteAcademicYear)

module.exports = academicYearRouter;


