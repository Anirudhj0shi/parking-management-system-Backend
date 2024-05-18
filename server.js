import express from "express";
import mongoose, { Mongoose } from "mongoose";
import {config} from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js'

config()

const app = express();
const port = process.env.PORT

mongoose.connect(process.env.Mongo_URL,{
    dbName:"Parking_Management_System"
}).then(()=>console.log("MongoDB Connected....!"));


// Init Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
app.use('/api/auth',authRoutes)

app.listen(port,()=>{
    console.log("Server is running on ",port)
})
