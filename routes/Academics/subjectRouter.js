const express = require('express');
const isLoggedIn = require('../../middleware/isLoggedIn');
const isAdmin = require('../../middleware/isAdmin');
const {createSubject, getSubjects, getSubject, updateSubject, deleteSubject} = require('../../controller/Academics/subjectCtrl');

const subjectRouter = express.Router(); 

subjectRouter
.route('/:programID')
//create subject
.post(isLoggedIn, isAdmin, createSubject)

subjectRouter
.route('/')
//get all subjects
.get(isLoggedIn, isAdmin, getSubjects)

subjectRouter
.route('/:id')
//get a subject by id
.get(isLoggedIn, isAdmin, getSubject)
//update subject
.put(isLoggedIn, isAdmin, updateSubject)
//delete subject
.delete(isLoggedIn, isAdmin, deleteSubject)


module.exports = subjectRouter; 