import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    title: {
        type: String,
        required:true,
        unique: true,
    },
    categories:{
        type:String,
        default: 'uncategorized'
    },
    image:{
        type:String,
        required: true,
        default:'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png'
    },
    slug:{
        type:String,
        required: true,
        unique:true
    }

}, {timestamps:true});

const post= mongoose.model('post', postSchema);
export default post;