import MyUser from "../Models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async(req,res)=>{
    const {username, email, password} = req.body;
    try {


if (!username || !email || !password || username === '' || email=== '' || password=== '') {
    return res.json('all fields required');
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
        res.send(error.message);
    }
}