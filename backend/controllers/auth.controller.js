import MyUser from "../Models/user.model.js"

export const signup = async(req,res)=>{
    const {username, email, password} = req.body;
    try {


if (!username || !email || !password || username === '' || email=== '' || password=== '') {
    return res.status(404).json('all fields required');
}
        const newUser = await new MyUser({
            username,
            email,
            password,
        });

        await newUser.save();
res.status(201).json('user created successfully');

    } catch (error) {
        console.log(error)
    }
}