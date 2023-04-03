
//import Admin mongoose model
const Admin = require('../../model/Staff/Admin');

//admin register logic
exports.adminRegisterCtrl = async (req, res)=>{
    const {name, email, password} = req.body; //data needed for admin model. Default role is admin

    try{
    //check if email exists---indicates admin already exists
    const adminFound = await Admin.findOne({email});
    if(adminFound){
        res.json("Admin exists");
    }
    //register admin
    const user = await Admin.create({
        name,
        email,
        password,
    });
        res.status(201).json({
            status: "success",
            data: user,
        }); 
    }
    catch(error){
        res.json({
            status: "failed",
            error: error.message, 
        });  
    }
};

//admin login logic
exports.adminLoginCtrl = (req, res)=>{
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
}; 

//admin get all logic
exports.adminGetAllCtrl = (req, res)=>{
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
};

//admin get single logic
exports.adminGetSingleCtrl = (req, res)=>{
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
};

//amdin update admin logic
exports.adminUpdateAdminCtrl = (req, res)=>{
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
};

//admin delete admin logic
exports.adminDeleteAdminCtrl = (req, res)=>{
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
};

//admin suspend teacher logic
exports.adminSuspendTeacherCtrl = (req, res)=>{
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
};

//admin unsuspend teacher logic
exports.adminUnsuspendTeacherCtrl = (req, res)=>{
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
};

//admin withdrawl teacher logic
exports.adminWithdrawlTeacherCtrl = (req, res)=>{
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
};

//admin unwithdrawl teacher logic
exports.adminUnwithdrawlTeacherCtrl = (req, res)=>{
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
};

//admin publish exam results
exports.adminPublishExamCtrl = (req, res)=>{
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
};

//admin unpublish exam results

exports.adminUnpublishExamCtrl = (req, res)=>{
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
        })
    }
};

