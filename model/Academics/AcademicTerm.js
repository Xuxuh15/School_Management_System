const mongoose = require("mongoose"); 
const {Schema} = mongoose; 

const academicTermSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    {timestamps: true}
);

const AcademicTerm = mongoose.model("AcademicTerm",academicTermSchema); 
module.exports = AcademicTerm; 
