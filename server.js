const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serve all static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/portfolio', function(req, res) {
  res.sendFile(path.join(__dirname, 'work.html'));
});

app.get('/services', function(req, res) {
  res.sendFile(path.join(__dirname, 'services.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
