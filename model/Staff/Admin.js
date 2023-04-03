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
    }, 
    {
        timestamps: true,   //this will automatically generate a field called created at and then it will be updated
    }
); 

//premiddleware before saving document into database
//uses function syntax as opposed to arrow to allow for bidning of this (instance of admin)

adminSchema.pre('save', async function(next){
    console.log('I have been called');
    //to avoid rehashing password when admin is updated
    if(!this.isModified('password')){
        next();
    }
    //salt
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password,salt);
    next(); //instance of admin password
});

//model

const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin; 



