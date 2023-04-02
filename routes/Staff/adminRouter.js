const express = require('express'); 
const adminRouter = express.Router(); 
const {adminRegisterCtrl,adminLoginCtrl,adminGetAllCtrl,
adminGetSingleCtrl,adminUpdateAdminCtrl,adminDeleteAdminCtrl,
adminSuspendTeacherCtrl,adminUnsuspendTeacherCtrl,
adminWithdrawlTeacherCtrl,adminUnwithdrawlTeacherCtrl,
adminPublishExamCtrl,adminUnpublishExamCtrl} = require('../../controller/Staff/adminCtrl');

//@desc admin register
//@route POST /api/v1/admins/register
//@access private

adminRouter.post('/register', adminRegisterCtrl);

//@desc admin login
//@route  POST /api/v1/admins/login
//@access private

adminRouter.post('/login', adminLoginCtrl);

//@desc admin get all
//@route GET /api/v1/admins
//@access private

adminRouter.get('/', adminGetAllCtrl);

//@desc admin get single admin
//@route GET /api/v1/admins/:id
//@access private

adminRouter.get('/:id', adminGetSingleCtrl);


//@desc admin update admin
//@route PUT /api/v1/admins/:id
//@access private
adminRouter.put('/:id', adminUpdateAdminCtrl )

//@desc admin delete admin
//@route DELETE /api/v1/admins/:id
//@access private
adminRouter.delete('/:id', adminDeleteAdminCtrl );

//@desc admin suspend teacher
//@route PUT /api/v1/admins/suspend/teacher/:id
//@access private
adminRouter.put('/suspend/teacher/:id', adminSuspendTeacherCtrl);

//@desc admin unsuspend teacher
//@route GET /api/v1/admins/unsuspend/teacher/:id
//@access private
adminRouter.put('/unsuspend/teacher/:id',adminUnsuspendTeacherCtrl );

//@desc admin withdrawl teacher
//@route PUT /api/v1/admins/withdrawl/teacher/:id
//@access private

adminRouter.put('/withdrawl/teacher/:id', adminUnwithdrawlTeacherCtrl );

//@desc admin unwithdrawl teacher
//@route GET /api/v1/admins/unwithdrawl/teacher/:id
//@access private

adminRouter.put('/unwithdrawl/teacher/:id', adminUnwithdrawlTeacherCtrl );

//@desc admin publish exam
//@route GET /api/v1/admins/publish/exam/:id
//@access private

adminRouter.put('/publish/exam/:id', adminPublishExamCtrl);

//@desc admin unpublish exam
//@route GET /api/v1/admins/unpublish/exam/:id
//@access private

adminRouter.put('/unpublish/exam/:id',adminUnpublishExamCtrl);  



module.exports = adminRouter; 

