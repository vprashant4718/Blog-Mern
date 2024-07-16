import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cors from 'cors'
dotenv.config();

const app = express();


app.use(cors());
mongoose.connect(process.env.MONGO_CONNECT)
.then(()=>{console.log('Connected to Mongo')})
.catch((err)=>{console.log(err)});



app.use(express.json());
app.listen(5000, (req,res)=>{
    console.log('Server is running on port 5000');  
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


app.use((err, req,res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        success: false,
        statusCode, 
        message,
    });
});