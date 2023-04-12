const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

//initialies a new mongoose Scheme (structure for documents that go in our collection)
const adminSchema = new mongoose.Schema(
    {
        name:{
            type: String, 
            required: true, 
        },
        email:{
            type: String, 
            required: true, 
        },
        password:{
            type: String, 
            required: true,
        },
        role:{
            type: String,
            default: "admin", 
        },
        academicTerm: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AcademicTerm", 
            }, 
        ],
        academicYear: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AcademicYear", 
            }, 
        ],
        classLevel: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ClassLevel",
            }, 
        ],
        programs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Program",
            }, 
        ],
        yearGroups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "YearGroup",
            }, 
        ],
        teachers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teachers",
            }, 
        ],
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Students",
            }, 
        ],
    }, 
    {
        timestamps: true,   //this will automatically generate a field called created at and then it will be updated
    }
); 


//model

const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin; 



