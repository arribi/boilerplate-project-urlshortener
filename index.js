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

addresses = [];

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  const short_url = addresses.length + 1;

  dns.lookup(url, (err, addresses,) => {
    if (err) {
      res.json({
        error: 'invalid url'
      });
    } else {
      addresses.push({ original_url: url, short_url: short_url });
      res.json({
        original_url: url,
        short_url: short_url
      });
    }
  });
});

app.get('/api/shorturl/:id', (req, res) => {
  const id = req.params.id;
  res.redirect('https://www.google.com')
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
