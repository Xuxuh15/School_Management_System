const express = require('express'); 

const adminRouter = express.Router(); 

//admin register

adminRouter.post('/register',(req, res)=>{
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

adminRouter.post('/',(req, res)=>{
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

//admin get all

//admin get single

module.exports = adminRouter; 

