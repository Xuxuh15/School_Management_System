const bcrypt = require('bcryptjs');

exports.hashPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10); 
    const passwordHashed = await bcrypt.hash(password,salt);
    return passwordHashed; 
}

exports.isMatched = async(password, hash)=>{
    const match = await bcrypt.compare(password,hash);
    return match;
}