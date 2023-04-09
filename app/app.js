//uses core node module
const { json } = require('express');
const express = require('express'); 
const morgan = require('morgan');
const app = express();   //assign express to app variable

//require global error handler middleware
const {globalErrHandler, notFoundErr} = require('../middleware/globalErrorHandler');

//Router middleware

//admin router
const adminRouter = require('../routes/Staff/adminRouter');

//academic year router
const academicYearRouter = require('../routes/Academics/academicYearRouter');

//academic term router
const academicTermRouter = require('../routes/Academics/academicTermRouter');

//Middlewares

app.use(morgan("dev")); 

//Incoming payload to JSON format

app.use(express.json()); 

//Admin Routes 
app.use("/api/v1/admins", adminRouter);

//Academic Year Routes
app.use("/api/v1/academic-years", academicYearRouter);

//Academic Term Routes
app.use("/api/v1/academic-terms", academicTermRouter);

//Error Middleware
//catches errors from routes and sends them back in JSON format
app.use(notFoundErr); 
app.use(globalErrHandler);

module.exports = app; 

