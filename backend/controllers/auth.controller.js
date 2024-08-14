import MyUser from "../Models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async(req,res, next)=>{
    const {username, email, password} = req.body;
    try {


if (!username || !email || !password || username === '' || email=== '' || password=== '') {
    next(errorHandler(400,'all fields required'))
}

const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new MyUser({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
    res.status(201).json('user created successfully');

    } catch (error) {
        next(error);
    }
}


export const signin = async(req,res, next)=>{
    const {email, password} = req.body;
    
    try {
    
if (!email || !password || email=== '' || password=== '') {
    next(errorHandler(400,'all fields required'))
}

 const user = await MyUser.findOne({email});

 if(!user){
    return next(errorHandler(404,'user not found'));
   
 }

 const verifypassword = bcryptjs.compareSync(password, user.password)

 if(!verifypassword){
   return next(errorHandler(404, "Invalid password"));

 }
 
 const jwt_token = jwt.sign({id:user._id, admin:user.isAdmin}, process.env.JWT_SECRET)
 const {password:pass, ...rest} = user._doc;

 res.cookie('access_token', jwt_token)

      
    res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
}




export const google = async(req,res, next)=>{
    const {name, email, googlePhotoUrl} = req.body;
    
   
try{
     const user = await MyUser.findOne({email});
 
 if(user){
          
     const jwt_token = jwt.sign({id:user._id, admin:user.isAdmin}, process.env.JWT_SECRET)
     const {password:pass, ...rest} = user._doc;
    
     res.cookie('access_token', jwt_token);  
        res.status(200).json(rest);  
 }
 else{
    const generateNewPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generateNewPassword, 10);
    const newUser = new MyUser({
        username: name.toLowerCase().split(' ').join('')+ Math.random().toString(8).slice(-4),
        email,
        password: hashedPassword,
        googlePhotoUrl
    });

    await newUser.save();

     const jwt_token = jwt.sign({id:newUser._id, admin:newUser.isAdmin}, process.env.JWT_SECRET)
     const {password, ...rest} = user._doc;
    
     res.cookie('access_token', jwt_token);  
        res.status(200).json(rest);  
 }
}
catch(error){
    next(error)
}
}