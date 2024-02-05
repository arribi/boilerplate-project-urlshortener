require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  dns.lookup(err, url) {
    if (err) {
      res.json({
        error: 'invalid url'
      });
    } else {
      res.json({
        original_url: url,
        short_url: 1
      });
    }
  }
});

app.get('/api/shorturl/:id', (req, res) => {
  const id = req.params.id;
  res.redirect('https://www.google.com')
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
