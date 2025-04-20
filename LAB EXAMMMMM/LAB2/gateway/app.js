const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/restaurants', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/api/customers', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/api/orders', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));

app.listen(3000, () => console.log('🚪 API Gateway running on port 3000'));
