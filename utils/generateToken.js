const jwt = require('jsonwebtoken');

//gets passed the id of a user as a parameter
const generateToken = (id)=>{
    return jwt.sign({id},"key",{expiresIn: "5d"});
};

module.exports = generateToken; 

