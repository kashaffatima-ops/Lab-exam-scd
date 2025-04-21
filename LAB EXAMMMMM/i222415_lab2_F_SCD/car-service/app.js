require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Car = require("./models/car_model");
const app = express();
const port = 3001;

app.use(express.json());

const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));

app.post('/cars', async (req, res) => {
    const {model,location} = req.body;
    const newuser = new Car({model,location,isavailable:true });
    await newuser.save();
    res.status(201).send(newuser);
});

app.get('/cars/:id', async (req, res) => {
    const newuser = await Car.findById(req.params.id);
    if (!newuser) return res.status(404).send('Car not found');
    res.send(newuser);
});
  

app.put('/cars/:id', async (req, res) => {
    const user = await Car.findById(req.params.id);
    if (!user) return res.status(404).send('Car not found');
    
    const { isAvailable } = req.body;
    user.isavailable = isAvailable;
    await user.save();
    res.send(user);
  });

app.listen(port, () => {
  console.log(`Customer Service running on port ${port}`);
});
