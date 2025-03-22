// index.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Basic route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint
app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
