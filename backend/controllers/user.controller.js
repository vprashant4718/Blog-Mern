import MyUser from '../Models/user.model.js'
import { errorHandler } from '../utils/errorHandler.js';
import bcryptjs from 'bcryptjs';

export const updateUser = async(req, res, next)=>{
    const verifiedUser = req.user.id;
    const paramsUser = req.params.userId;
    if(verifiedUser !== paramsUser){
        return next(errorHandler(403, 'unauthorized'));
    };
    
    try {
    const {username, email, password} = req.body;
    const user = await MyUser.findOne({username});
    const userEmail = await MyUser.findOne({email});
    const VerifiedUserData = await MyUser.findById(verifiedUser);
    
    var hashedpassword = '';
     if(password && password.length >= 5){
            hashedpassword = bcryptjs.hashSync(password, 10);
        }
    if(password && password.length < 5){
            next(errorHandler(404, 'password must be of 5 letters'));
        }
   
    if (user && user.username === VerifiedUserData.username) {
        return next(errorHandler(404,`Your username is already ${user.username}`));
    }
    if (user && user.username !== VerifiedUserData.username) {
        return next(errorHandler(404,`username already taken`));
    }

    if (userEmail && userEmail.email=== VerifiedUserData.email) {
        return next(errorHandler(404, `Your email is already ${userEmail.email}  `));
    }
    if (userEmail && userEmail.email !== VerifiedUserData.email) {
        return next(errorHandler(404, `Email already taken`));
    }
 
    
    const userUpdate = await MyUser.findByIdAndUpdate(req.params.userId, 
        { $set:{
            username: req.body.username,
            email : req.body.email,
            password:hashedpassword,
            googlePhotoUrl:req.body.googlePhotoUrl
        }},
        {new:true}
    );
    const {password:pass, ...rest} = userUpdate._doc;
    res.status(200).json(rest)
        
        
    } catch (error) {
        next(error)
    }
        
}


export const deleteUser=async(req, res,next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(404, 'unauthorized'))
    }

    try {
        await MyUser.findByIdAndDelete(req.user.id);
        res.status(200).json('Your account is deleted successfully');
    } catch (error) {
        next(error)
    }
}


export const signOut= (req, res, next)=>{
    try {
        res.clearCookie('access_token').status(200).json('user has been sign out');
    } catch (error) {
        next(error)
    }
}