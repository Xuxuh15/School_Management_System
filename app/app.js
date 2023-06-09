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

//class level router
const classLevelRouter = require('../routes/Academics/classLevelRouter');

//program router
const programRouter = require('../routes/Academics/programRouter');

//subject router
const subjectRouter = require('../routes/Academics/subjectRouter');

//yearGroup router
const yearGroupRouter = require('../routes/Academics/yearGroupRouter');

//teacher router
const teacherRouter = require('../routes/Staff/teacherRouter');

//exam router
const examRouter = require('../routes/Academics/examRouter');

//Student Router
const studentRouter = require('../routes/Students/studentRouter');

//Questions Router
const questionsRouter = require('../routes/Academics/questionsRouter');

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

//Class Level Routes
app.use("/api/v1/class-levels", classLevelRouter);

//Program Routes
app.use("/api/v1/programs", programRouter);

//Subject Routes
app.use("/api/v1/subjects", subjectRouter);

//Year Group routes
app.use("/api/v1/year-groups", yearGroupRouter);

//Teacher route
app.use("/api/v1/teachers", teacherRouter);

//Exam Router
app.use('/api/v1/exams', examRouter); 

//Student Router
app.use('/api/v1/students', studentRouter);

//Questions router
app.use('/api/v1/questions', questionsRouter); 

//Error Middleware
//catches errors from routes and sends them back in JSON format
app.use(notFoundErr); 
app.use(globalErrHandler);

module.exports = app; 

