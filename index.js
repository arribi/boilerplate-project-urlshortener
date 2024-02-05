require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const { URL } = require('url');
const bodyParser = require("body-parser");
const app = express();

// I store de URLs in an array
const addresses = [];

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

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

  if (!url) {
    res.json({
      error: 'invalid url'
    })
  } else {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname;
    dns.lookup(host, (err, address, family) => {
      if (err) {
        res.json({
          error: 'invalid url'
        });
      } else {
        const short_url = addresses.length + 1;
        addresses.push({ original_url: url, short_url: short_url });
        res.json({
          original_url: url,
          short_url: short_url
        });
      }
    });
  }
});

app.get('/api/shorturl/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const foundAddress = addresses.find((address) => address.short_url === id);

  if (foundAddress) {
    res.redirect(foundAddress.original_url);
  } else {
    res.status(404).json({
      error: 'Short URL not found'
    });
  }
});



app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
