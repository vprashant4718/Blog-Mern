import MyUser from "../Models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async(req,res, next)=>{
    const {username, email, password} = req.body;
    try {


if (!username || !email || !password || username === '' || email=== '' || password=== '') {
    next(errorHandler(400,'all fields required'))
}

const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = await new MyUser({
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