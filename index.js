require('dotenv').config()
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {

    const url = req.query.url;

    try {
        const response = await fetch(url);
        const data = await response.buffer();
        res.set('Content-Type', response.headers.get('content-type'));
        res.send(data);
    } catch (error) {
        console.error(error)
        res.status(500).send('Error fetching the image.');
    }
});

app.listen(3001, () => {
  console.log(`Proxy server running on port 3001`);
});