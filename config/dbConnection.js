const mongoose = require('mongoose'); 
const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL); 
        console.log('Connected to the database'); 
    }
    catch(err){
        console.log('Connection failed', err.message); 

    }
}

dbConnect(); 

//export the connect function
module.exports = dbConnect; 
