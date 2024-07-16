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
    return res.status(404).json('user not found');
   
 }

 const verifypassword = bcryptjs.compareSync(password, user.password)

 if(!verifypassword){
   return res.status(401).json('Invalid User');

 }

 const jwt_token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

 res.cookie('access_token', jwt_token)

      
    res.status(200).json('User logged in successfully');

    } catch (error) {
        next(error);
    }
}