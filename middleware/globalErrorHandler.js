const globalErrHandler = (err,req,res,next)=>{
    //status
    //status code
    //error message
    //stack
    const status = err.status ? err.status: "failed"; 
    const statusCode =err.statusCode ? err.statusCode: 500;
    const message = err.message; 
    const stack = err.stack; 

    res.status(statusCode).json({
        status,message,stack
    }); 

};

//Not found --- for routes that do not exist

const notFoundErr = (req, res, next)=>{
    const err = new Error(`Can't find ${req.originalUrl} on the server`);  //becomes value of error message
    next(err); 
}



module.exports = {globalErrHandler, notFoundErr}; 