const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY}  = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('UserModel');
module.exports=(req,res,next)=>{
    const authHead = req.headers.authorization;
    if(!authHead){
       return res.status(401).json({error:'You must be logged in to access this resource'});
    }

    else{
        debugger;
        const token = authHead.replace("Bearer ","");
        jwt.verify(token,JWT_SECRET_KEY,(err,payload)=>{
            if(err)
           return res.status(401).json({error:'You must be logged in to access this resource'});
           else{
               const {_id} = payload;
               User.findById(_id).then((userData)=>{
                req.user = userData;
                next();
               }).catch((err)=>{    
                console.log(err);
               })
           }
           
        });
    }

    

}