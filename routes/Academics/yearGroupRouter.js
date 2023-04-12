const express = require('express');
const isLoggedIn = require('../../middleware/isLoggedIn');
const isAdmin = require('../../middleware/isAdmin');
const {createYearGroup,getYearGroups, getYearGroup,
    updateYearGroup, deleteYearGroup} = require('../../controller/Academics/yearGroupCtrl');

const yearGroupRouter = express.Router(); 

yearGroupRouter
.route("/")
//create year group
.post(isLoggedIn, isAdmin, createYearGroup)
//get all year groups
.get(isLoggedIn, isAdmin,getYearGroups)

yearGroupRouter
.route("/:id")
//get year group by id
.get(isLoggedIn,isAdmin,getYearGroup)
//update year group
.put(isLoggedIn, isAdmin,updateYearGroup)
//delete year group
.delete(isLoggedIn, isAdmin,deleteYearGroup)

module.exports = yearGroupRouter; 