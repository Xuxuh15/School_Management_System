const mongoose = require("mongoose"); 
const {Schema} = mongoose; 


const yearGroupSchema = new Schema(

    {
        name:{
            type: String,
            required: true,
        }, 
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
            required: true,
        },
        academicYear: {
            type: mongoose.Schema.Type.ObjectId,
            ref: "AcademicYear", 
            required: true, 
        }, 

    },
    {timestamps: true,}
); 

//model
const yearGroup = mongoose.model("YearGroup", yearGroupSchema);
module.exports = yearGroup; 


    


