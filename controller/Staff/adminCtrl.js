const AsyncHandler = require('express-async-handler');
//import Admin mongoose model
const Admin = require('../../model/Staff/Admin');
const generateToken = require('../../utils/generateToken');
const verifyToken = require('../../utils/verifyToken');
//admin register logic
exports.adminRegisterCtrl = AsyncHandler(async (req, res)=>{
    const {name, email, password} = req.body; //data needed for admin model. Default role is admin

    
    //check if email exists---indicates admin already exists
    const adminFound = await Admin.findOne({email});
    if(adminFound){
        throw new Error("Admin exists");
    }
    //register admin
    const user = await Admin.create({
        name,
        email,
        password,
        message: "Admin registered successfully!"
    });
        res.status(201).json({
            status: "success",
            data: user,
        }); 
    
});

//admin login logic
exports.adminLoginCtrl = AsyncHandler(async (req, res)=>{
    const {email,password} = req.body; //get email and password from request

    //fethc user from database
    const user =  await Admin.findOne({email}); 

    //check if user exists
    if(!user){
        return res.json({message: "User not found" });
    }
    if(user &&  await user.verifyPassword(password)){
        //save user into request object
        const token = generateToken(user._id);
        const verified = verifyToken(token);
        return res.json(
         {
            data: generateToken(user._id),
            message: "Admin logged in successfully"
         });
    }
    else{
        return res.json({message: 'Invalid login credentials'}); 
    }
}); 

//admin get all admins logic
exports.adminGetAllCtrl = AsyncHandler(async (req, res)=>{
    const admins = await Admin.find();
    res.status(200).json({
        status: "successful",
        message: "Successfully fetched all Admins",
        data: admins
    });
})

//admin get single logic
exports.getAdminProfileCtrl =AsyncHandler( async (req, res)=>{
    //await fetching of Admin profile
   const admin = await Admin.findById(req.userAuth.id).select('-password -createdAt -updatedAt'); //exclude password and createdAt date
   //if found
   if(admin){
    res.status(200).json({
        status: "success",
        data: admin,
        message: "Admin profile fetched successfully"
    });
   }
   //if not found
   else{
    throw new Error('Admin not found');
   }

});

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

