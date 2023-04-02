const mongoose = require("mongoose"); 
const {Schema} = mongoose; 

const ProgramSchema = new Schema(
    {
       name:{
        type: String,
        required: true,
       } ,
       description: {
        type: String,
        required: true, 
       },
       duration:{
        type: String,
        required: true,
        default: "4 years", 
       },

       code:{
        type: String,
        default: function(){
            return (
                this.name.split(" ").map(name=> name[0]) //puts letters in array then grabs first letter
                .join('').toUpperCase()  //converst first letter to upperCase
                + Math.floor(10 + Math.random() * 90) +  //generates random numbers
                Math.floor(10 + Math.random() * 90)
            );
        },
       },
       createdBy: {
        type: Schema.Types.ObjectId,   //references the admin model
        ref: "Admin",
        required: true, 
       },
       //array of teacher objects
       teachers:[ 
        {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
            default: [], 
           },
       ], 
       //array of student objects
       students:[
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
            default: [],
           },
       ],
       subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            default: [],
        },
       ],
    },
    {timestamp: true}
);

const Program = mongoose.model("Program", ProgramSchema); //takes name of Scheme and then ProgramSchema as parameters

module.exports = Program; 
