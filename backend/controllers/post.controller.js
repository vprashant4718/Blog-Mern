import post from "../Models/post.model.js";
import { errorHandler } from "../utils/errorHandler.js"


export const postBlog=async(req,res,next)=>{ 
    if(!req.user.admin){ 
        return next(errorHandler(404, 'you are not allowed to create post'));
    }

    if(!req.body.title || !req.body.content){
        return next(errorHandler(403, 'all fields are required'));
    }

   const slug = req.body.title.split(' ').join('_').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '_');

   const createpost = new post({
       ...req.body, slug, userId:req.user.id,
   });

   try {
    const savedpost = await createpost.save();
    res.status(201).json(savedpost);

   } catch (error) {
    next(error);
   }


}