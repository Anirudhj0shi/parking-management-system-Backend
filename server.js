import express from "express";
import mongoose, { Mongoose } from "mongoose";
import {config} from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js'
import Slot from "./models/Slot.js";

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

// Slot model
// const Slot = require('./models/Slot');
// Route to store booked slots
app.post('/api/booked-slots', async (req, res) => {
    const { selectedSlots } = req.body;
  
    try {
      // Create a new Slot document for each selected slot
      await Promise.all(selectedSlots.map(async (slot) => {
        await Slot.create({ slotNumber: slot });
      }));
  
      res.status(200).json({ msg: 'Slots booked successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // Route to retrieve booked slots
  app.get('/api/booked-slots', async (req, res) => {
    try {
      const bookedSlots = await Slot.find({}, { _id: 0, slotNumber: 1 });
      res.json(bookedSlots.map(slot => slot.slotNumber));
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

app.listen(port,()=>{
    console.log("Server is running on ",port)
})
