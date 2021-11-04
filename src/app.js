const express = require('express');
//const cors = require('cors');
const userAuth = require('./routes/userAuth');

//JSON parsing middleware
const app = express();


app.use(express.json());

app.use('/api/v1/', userAuth);

module.exports = app;