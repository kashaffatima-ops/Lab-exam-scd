const express = require('express');
const app = express();
app.use(express.json());

let restaurants = [];
let idCounter = 1;

app.post('/restaurants', (req, res) => {
  const restaurant = { id: idCounter++, ...req.body };
  restaurants.push(restaurant);
  res.status(201).json(restaurant);
});

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id == req.params.id);
  if (!restaurant) return res.status(404).send('Restaurant not found');
  res.json(restaurant);
});

app.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

app.listen(3001, () => console.log('🍕 Restaurant service running on port 3001'));
