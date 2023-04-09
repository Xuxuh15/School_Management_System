const express = require('express');
const isLoggedIn = require('../../middleware/isLoggedIn');
const isAdmin = require('../../middleware/isAdmin');
const {createAcademicTerm, getAcademicTerms} = require('../../controller/Academics/academicTermCtrl');


const academicTermRouter = express.Router();

academicTermRouter
.route('/')
//create new academic term
.post(isLoggedIn, isAdmin, createAcademicTerm)
//fetch all academic terms
.get(isLoggedIn, isAdmin, getAcademicTerms)


module.exports = academicTermRouter;

