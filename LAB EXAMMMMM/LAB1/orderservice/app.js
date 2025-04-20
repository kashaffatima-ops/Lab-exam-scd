const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

let orders = [];
let idCounter = 1;

app.post('/orders', async (req, res) => {
  const { customerId, restaurantId, items } = req.body;

  try {
    // Check if restaurant exists
    const restaurant = await axios.get(`http://localhost:3001/restaurants/${restaurantId}`);
    // Check if customer exists
    const customer = await axios.get(`http://localhost:3002/customers/${customerId}`);

    // Dummy payment
    const paymentSuccess = Math.random() > 0.2;
    if (!paymentSuccess) return res.status(402).send("Payment Failed");

    const newOrder = {
      id: idCounter++,
      customerId,
      restaurantId,
      items,
      status: 'Confirmed',
      createdAt: new Date()
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).send("Invalid customer or restaurant ID");
  }
});

app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (!order) return res.status(404).send("Order not found");
  res.json(order);
});

app.get('/orders/history/:customerId', (req, res) => {
  const customerOrders = orders.filter(o => o.customerId == req.params.customerId);
  res.json(customerOrders);
});

app.listen(3003, () => console.log('Order service running on port 3003'));
