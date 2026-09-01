const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Ahead of the static handler on purpose. `portfolio/` is a real directory, so
// static would answer first with its own trailing-slash redirect and cost a
// second hop before this one ran.
app.get('/portfolio', (req, res) => res.redirect(301, '/'));

app.use(express.static(__dirname, { extensions: ['html'] }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'services.html')));

// Anything static did not resolve is a real 404. Status first, then the page --
// a 404 body served as 200 gets the missing URL indexed.
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, '404.html')));

app.listen(port);
console.log('Server started at http://localhost:' + port);
