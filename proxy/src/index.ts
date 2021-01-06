const express = require('express');
const request = require('request');

const app = express();
const API_URL = 'https://bad-api-assignment.reaktor.com/v2'

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/products/facemasks', (req, res) => {
  request(
    { url: `${API_URL}/products/facemasks` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));