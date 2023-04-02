//uses core node module
const express = require('express'); 
const morgan = require('morgan');
const app = express();   //assign express to app variable

//Middlewares

app.use(morgan("dev")); 

//Routes

//admin register

app.post("/api/v1/admins/register", (req, res)=>{
    try{
        res.status(201).json({
            status: "success",
            data: "Admin has been registered",
        }); 
    }
    catch(error){
        res.json({
            status: "failed",
            error: error.message, 
        });  
    }
}); 

//admin login
app.post("/api/v1/admins/login", (req, res)=>{
    try{
        res.status(201).json({
            status: "success",
            data: "Admin has been logged in",
        }); 
    }
    catch(error){
        res.json({
            status: "failed",
            error: error.message, 
        });  
    }
}); 

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

app.post("/api/v1/admins/unsuspend/teacher/:id", (req, res)=>{
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








module.exports = app; 

