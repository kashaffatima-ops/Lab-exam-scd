require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3002;
const axios = require('axios');
const Booking = require("./models/booking_model");

app.use(express.json());

const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));

app.post('/bookings', async (req, res) => {
    const { userid, carid, startdate, enddate} = req.body;
    const user= await axios.get(`http://localhost:3000/users/${userid}`);   
    
    if(user.data.activebooking >= user.data.maxbooking){
        return res.status(400).send('User has reached maximum bookings');
    }

    const car = await axios.get(`http://localhost:3001/cars/${carid}`);
    if(!car.data.isavailable){
        return res.status(400).send('Car is not available');
    }
    
    const newbooking = new Booking({userid, carid, startdate, enddate });
    await newbooking.save();

    await axios.put(`http://localhost:3000/users/${userid}`, {activebooking: user.data.activebooking + 1});
    await axios.put(`http://localhost:3001/cars/${carid}`, {isavailable: false}); 
});

app.get('/bookings/:userid', async (req, res) => {
    const bookings = await Booking.find({ userid: req.params.userid });
    res.send(bookings);
  });

app.delete('/bookings/:bookid', async (req, res) => {
    const newbooking = await Booking.findById(req.params.bookid);
    if (!newbooking) return res.status(404).send('Booking not found');
  
    await Booking.findByIdAndDelete(req.params.bookid);
    res.send(newbooking);
  });   

app.listen(port, () => {
  console.log(`Booking Service running on port ${port}`);
});
