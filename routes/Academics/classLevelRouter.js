const express = require('express');
//login middleware
const isLoggedIn = require('../../middleware/isLoggedIn');
//admin check middleware
const isAdmin = require('../../middleware/isAdmin.js');
const {createClassLevel, getClassLevels, getClassLevel, updateClassLevel, deleteClassLevel} = require('../../controller/Academics/classLevelCtrl.js');


const classLevelRouter = express.Router();

classLevelRouter
.route("/")
//create class level and store it in database
.post(isLoggedIn, isAdmin, createClassLevel)
//fetches all classes from database
.get(isLoggedIn, isAdmin, getClassLevels)


classLevelRouter
.route("/:id")
//retrieve class level by id
.get(isLoggedIn, isAdmin, getClassLevel)
//update class level 
.put(isLoggedIn, isAdmin, updateClassLevel)
//delete class level
.delete(isLoggedIn, isAdmin, deleteClassLevel)
module.exports = classLevelRouter; 