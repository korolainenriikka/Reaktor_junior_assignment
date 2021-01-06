const express = require('express')
const request = require('request')

const app = express()
const API_URL = 'https://bad-api-assignment.reaktor.com/v2'

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/*', (req, res) => {
  request(
    { url: `${API_URL}${req.url}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200 || !body) {
        return res.status(500).end()
      }

      res.json(JSON.parse(body))
    }
  )
})

const PORT = process.env.NODE_ENV === 'test'? 3002 : process.env.PORT || 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))

module.exports = app