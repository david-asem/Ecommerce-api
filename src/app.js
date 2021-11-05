const express = require('express');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const ordersRoute = require('./routes/ordersRoute');
//const cors = require('cors');
const userAuth = require('./routes/userAuth');

//JSON parsing middleware
const app = express();


app.use(express.json());

app.use('/api/v1/', userAuth);

app.use('/api/v1/products', productRoute);

app.use('/api/v1/cart', cartRoute);

app.use('/api/v1/order', ordersRoute);

app.use('/api/v1/user/cart', cartRoute);

app.use('/api/v1/user', ordersRoute);

module.exports = app;