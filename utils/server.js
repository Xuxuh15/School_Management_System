//start with node server.js

//we want separation of concern. That is why the server file is separated from the app file

const http = require('http'); 
const app = require("../app/app"); 
const PORT = process.env.PORT || 2020; //uses global variable to get port number. Otherwise assigns port number 2020
console.log(app); 

 

const server = http.createServer(app); 


// server

server.listen(PORT,(err)=> {   //calls listen() function on app. Takes two parameters: a port number and callback function
    if(err){
        console.log(err); 
    }
    console.log(`Server is running on port ${PORT}`); 
}); 






