const mongoose =require('mongoose'); 
const {Schema} = mongoose; 


const subjectSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        }, 
        description:{
            type: String,
            required: true, 
        },
        teacher:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
        },
        ],
        academicTerm: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicTerm", 
            required: true,
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin", 
            required: true, 
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true, 

        }, 
        duration:{
            type: String,
            required: true,
            default: "3 months", 
        },
    }, 
    {timestamps: true}
);

const Subject = mongoose.model("Subject",subjectSchema); 

module.exports = Subject; 
