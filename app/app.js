//uses core node module
const express = require('express'); 
const morgan = require('morgan');
const app = express();   //assign express to app variable

//Router middleware

const adminRouter = require('../routes/Staff/adminRouter');

//Middlewares

app.use(morgan("dev")); 

//Routes

//admin register

app.use("/api/v1/admins", adminRouter); 

//admin login
app.use("/api/v1/admins/login", adminRouter); 

//get all admins

app.get("/api/v1/admins", (req, res)=>{
    try{
        res.status(201).json({
            status: "success",
            data: "All admins",
        }); 
    }
    catch(error){
        res.json({
            status: "failed",
            error: error.message, 
        });  
    }
}); 

//get single admins
app.get("/api/v1/admins/:id", (req, res)=>{
    try{
        res.status(201).json({
            status: "success",
            data: "Single admin",
        }); 
    }
    catch(error){
        res.json({
            status: "failed",
            error: error.message, 
        });  
    }
}); 

//update admin

app.put("/api/v1/admins/:id", (req, res)=>{
    try{
        res.status(201).json({
            status: "success",
            data: "Update admin",
        }); 
    }
    catch(error){
        res.json({
            status: "failed",
            error: error.message, 
        });  
    }
}); 

//delete admin

app.delete("/api/v1/admins/:id", (req, res)=>{
    try{
        res.status(201).json({
            status: "success",
            data: "Delete admin",
        }); 
    }
    catch(error){
        res.json({
            status: "failed",
            error: error.message, 
        });  
    }
}); 

//admin suspend teacher

app.put("/api/v1/admins/suspend/teacher/:id", (req, res)=>{
    try{
        res.status(201).json({
            status: "success",
            data: "Admin suspend teacher",
        }); 
    }
    catch(error){
        res.json({
            status: "failed",
            error: error.message, 
        });  
    }
}); 

//admin unsuspend teacher
app.put("/api/v1/admins/unsuspend/teacher/:id", (req, res)=>{
    try{
        res.status(201).json({
            status: "success",
            data: "Admin unsuspend teacher",
        }); 
    }
    catch(error){
        res.json({
            status: "failed",
            error: error.message, 
        });  
    }
}); 

//admin withdrawl teacher

app.put("/api/v1/admins/withdrawl/teacher/:id", (req, res)=>{
    try{
        res.status(201).json({
            status: "success",
            data: "Admin withdrawl teacher",
        }); 
    }
    catch(error){
        res.json({
            status: "failed",
            error: error.message, 
        });  
    }
}); 

//admin unwithdrawl teacher
app.put("/api/v1/admins/unwithdrawl/teacher/:id", (req, res)=>{
    try{
        res.status(201).json({
            status: "success",
            data: "Admin unwithdrawl teacher",
        }); 
    }
    catch(error){
        res.json({
            status: "failed",
            error: error.message, 
        });  
    }
}); 

//admin publish exam results

app.put("/api/v1/admins/publish/exam/:id", (req, res)=>{
    try{
        res.status(201).json({
            status: "success",
            data: "Admin publish exam",
        }); 
    }
    catch(error){
        res.json({
            status: "failed",
            error: error.message, 
        });  
    }
}); 

//admin unpublish result

app.put("/api/v1/admins/unpublish/exam/:id", (req, res)=>{
    try{
        res.status(201).json({
            status: "success",
            data: "Admin unpublish exam result",
        }); 
    }
    catch(error){
        res.json({
            status: "failed",
            error: error.message, 
        });  
    }
}); 








module.exports = app; 

