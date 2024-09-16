require('dotenv').config()
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://192.168.1.160:5173', 'https://realtered.onrender.com'];

const corsOptions = 
{
    origin: function (origin, callback) 
    {
        // Check if the request's origin is in the allowedOrigins array
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) 
        {
            callback(null, true);
        }
        else
        {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Enable credentials (cookies)
}


app.use(cors(corsOptions));

app.get('/proxy', async (req, res) => 
{
    const url = req.query.url;

    console.log(url)

    try {
        const response = await fetch(url);
        const data = await response.buffer();
        res.set('Content-Type', response.headers.get('content-type'));
        res.send(data);
    } 
    catch (error) 
    {
        console.error("Error fetching image")
        console.error(error)
        res.status(500).send('Error fetching the image.');
    }
});

app.listen(3001, () => {
  console.log(`Proxy server running on port 3001`);
});