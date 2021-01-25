const express = require('express')
const app = express()
const cors = require('cors')
const corsConfig = require('./utils').default

corsConfig.applyCors(app)

app.post('/enable-cors', (req, res) => {
    corsConfig.toggleCors(app)
    res.send(`Cors enabled: ${corsConfig.getUsingCors()}`)
});

app.get('/cors-status', (req, res) => {
    res.send(`Your request was successful and CORS is currently ${corsConfig.getUsingCors()}`)
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.listen(3000, () => { console.log('Listening'); })
