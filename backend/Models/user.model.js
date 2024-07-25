import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,

    },
    email : {
        type: String,
        required: true,
        unique: true,

    },
    password : {
        type: String,
        required: true,

    },
    googlePhotoUrl : {
        type: String,
       default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile-icon&psig=AOvVaw2azo6ddIIPMAQ4SDWk5To8&ust=1722000398582000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOj3l8-lwocDFQAAAAAdAAAAABAE'
    },

},{timestamps:true}
);

const MyUser = mongoose.model('User', UserSchema);

export default MyUser;