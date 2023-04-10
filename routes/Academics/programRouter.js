const express = require('express');
//login checker middleware
const isLoggedIn = require('../../middleware/isLoggedIn');
//admin checker middleware
const isAdmin = require('../../middleware/isAdmin');
const { createProgram, getPrograms, getProgram, updateProgram, deleteProgram } = require('../../controller/Academics/programCtrl');

//handle program endpoints
const programRouter = express.Router(); 

programRouter
.route("/")
//create program
.post(isLoggedIn, isAdmin, createProgram)
//fetch programs
.get(isLoggedIn, isAdmin, getPrograms)

programRouter 
.route("/:id")
//get program by id
.get(isLoggedIn, isAdmin,getProgram)
//update program
.put(isLoggedIn, isAdmin, updateProgram)
//delete program
.delete(isLoggedIn, isAdmin, deleteProgram)



module.exports = programRouter; 