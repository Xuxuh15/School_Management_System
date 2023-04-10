const express = require('express');
const isLoggedIn = require('../../middleware/isLoggedIn');
const isAdmin = require('../../middleware/isAdmin');
const {createAcademicTerm, getAcademicTerms, getAcademicTerm, updateAcademicTerm, deleteAcademicTerm} = require('../../controller/Academics/academicTermCtrl');


const academicTermRouter = express.Router();

academicTermRouter
.route('/')
//create new academic term
.post(isLoggedIn, isAdmin, createAcademicTerm)
//fetch all academic terms
.get(isLoggedIn, isAdmin, getAcademicTerms)

academicTermRouter
.route('/:id')
//get single academic term
.get(isLoggedIn, isAdmin, getAcademicTerm)
//update single academic term
.put(isLoggedIn, isAdmin, updateAcademicTerm)
//delete a single academic term
.delete(isLoggedIn, isAdmin, deleteAcademicTerm)



module.exports = academicTermRouter;

