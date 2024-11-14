const express = require('express');

const app = express();

// Use express.json() to handle JSON requests
app.use(express.json());

// Simple route to receive POST requests
app.post('/api/data', (req, res) => {
  console.log('Data received at the backend:', req.body);
  res.json({
    message: 'Data received successfully',
    receivedData: req.body
  });
});

// Start the backend server
app.listen(4000, () => {
  console.log('Backend server running on port 4000');
});
