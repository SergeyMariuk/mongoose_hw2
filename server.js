require('dotenv').config();
const express = require('express');
const rootRoutes = require('./modules/routes');
const app = express();

// CORS.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next()
})

// Json body parser.
app.use(express.json());

app.use('/api', rootRoutes)

//Run server.
app.listen(process.env.PORT, () => {
    console.log('Server started on port: '+ process.env.PORT)
})
