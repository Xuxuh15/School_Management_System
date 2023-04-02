const mongoose = require('mongoose'); 
const dbConnect = async()=>{
    try{
        await mongoose.connect('mongodb+srv://xuxuh:W9N1Gl1fWNt6MJkY@smsystem.qt3zd0i.mongodb.net/SMSystem?retryWrites=true&w=majority'); 
        console.log('Connected to the database'); 
    }
    catch(err){
        console.log('Connection failed', err.message); 

    }
}

dbConnect(); 

//export the connect function
module.exports = dbConnect; 
