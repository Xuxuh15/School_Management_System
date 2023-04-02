const mongoose = require("mongoose");

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
    }, 
    {
        timestamps: true,   //this will automatically generate a field called created at and then it will be updated
    }
); 


//model

const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin; 



