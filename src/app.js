const express = require('express');
//const cors = require('cors');
const path = require('path');
const userRoute = require('./routes/userRoute');

//JSON parsing middleware
const app = express();


app.use(express.json());

app.use('/api/v1/user', userRoute);

module.exports = app;