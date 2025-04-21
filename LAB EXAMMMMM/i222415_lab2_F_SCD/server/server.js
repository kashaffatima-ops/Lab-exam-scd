const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

app.use('/users', proxy('http://localhost:3000'));  
app.use('/cars', proxy('http://localhost:3001'));
app.use('/bookings', proxy('http://localhost:3002'));   

app.listen(3003, () => {
  console.log('API Gateway running on port 3003');
});

//npm install express-http-proxy