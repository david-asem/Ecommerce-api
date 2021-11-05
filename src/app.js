const express = require('express');
const productRoute = require('./routes/productRoute');
//const cors = require('cors');
const userAuth = require('./routes/userAuth');

//JSON parsing middleware
const app = express();


app.use(express.json());

app.use('/api/v1/', userAuth);

app.use('/api/v1/products', productRoute);

module.exports = app;