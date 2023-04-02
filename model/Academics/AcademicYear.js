const mongoose = require('mongoose'); 
const {Schema} = mongoose; 

const academicYearSchema = new Schema(
    {
        name:{
            type:String,
            require: true,
        },
        fromYear: {
            type: String,
            required: true,
        },
        toYear:{
            type:String,
            required: true, 
        },
        isCurrent: {
            type: Boolean, 
            default: false,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "Admin", 
            required: true, 

        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "Student", 
            }, 
        
        ],
        teachers: [
            {
              type: Schema.Types.ObjectId,
              ref: "Teacher",  
            },
        ],
        //Finance
        //Librarian
        //....
    },
    {
        timestamps: true,
    }
); 

const AcademicYear = mongoose.model("AcademicYear", academicYearSchema);
module.exports = AcademicYear; 