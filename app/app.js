//uses core node module
const express = require('express'); 
const morgan = require('morgan');
const app = express();   //assign express to app variable

//Router middleware

const adminRouter = require('../routes/Staff/adminRouter');

//Middlewares

app.use(morgan("dev")); 

//Admin Routes 
app.use("/api/v1/admins", adminRouter);

module.exports = app; 

