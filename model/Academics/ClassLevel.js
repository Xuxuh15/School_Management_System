const mongoose = require('mongoose');
const {Schema} = mongoose; 



const ClassLevelSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        students:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
            },
        ],
        //oiptional
        subject: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject",

            },
        ],
        teachers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teacher",
            },
        ],
     
    },
    {timestamps: true}
);

//model
const ClassLevel = mongoose.model("ClassLevel", ClassLevelSchema);
module.exports = ClassLevel; 
