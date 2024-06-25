import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routers/user.route.js'
import authRouter from './routers/auth.route.js'
import listingRouter from './routers/listing.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path';
import bodyParser from 'body-parser'
import moongoose from 'moongoose'
dotenv.config();
mongoose
.connect(process.env.MONGO)
.then(()=>{
    console.log('Connected to MongoDB!')
}).catch((err)=>{
    console.log(err);
});



const app=express()
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(
    {
        origin :["https://deploy-mern-1whq.vercel.app"],
        methods:["POST","GET"],
        credentials :true
    }
));
app.use(express.json());
app.use(cookieParser());
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});



app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});