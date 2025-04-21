require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user_model");
const app = express();
const port = 3000;

app.use(express.json());

const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));

app.post('/users', async (req, res) => {
    const {name, email } = req.body;
    const newuser = new User({name, email });
    await newuser.save();
    res.status(201).send(newuser);
});

app.get('/users/:id', async (req, res) => {
    const newuser = await User.findById(req.params.id);
    if (!newuser) return res.status(404).send('User not found');
    res.send(newuser);
});

app.put('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    
    const { activeBookings } = req.body;
    user.activebooking = activeBookings;
    await user.save();
    res.send(user);
  });
  
app.listen(port, () => {
  console.log(`Customer Service running on port ${port}`);
});
