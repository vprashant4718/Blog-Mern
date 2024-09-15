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



export const getPost = async(req, res, next)=>{
    try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1:-1;
    const posts = await post.find({
       ...(req.query.userId && {userId: req.query.userId}),
       ...(req.query.category && {category: req.query.category}),
       ...(req.query.slug && {slug: req.query.slug}),
       ...(req.query.postId && { _id: req.query.postId}),
       ...(req.query.searchTerm && {
        $or: [
            {title:{$regex: req.query.searchTerm, $options:'i'}},
            {content:{$regex: req.query.searchTerm, $options:'i'}},

        ],
         }),
            }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit);  
        const totalPosts = await post.countDocuments();
        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastmonthPosts= await post.countDocuments({
            createdAt:{$gte: oneMonthAgo}
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastmonthPosts
        });
    } catch (error) {
        next(error);
    }
}