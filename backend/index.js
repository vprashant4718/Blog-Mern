import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGO_CONNECT).then(()=>{console.log('Connected to Mongo')});

const app = express();

app.listen(5000, (req,res)=>{
    console.log('Server is running on port 5000');
    
})