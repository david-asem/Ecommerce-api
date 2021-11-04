const express = require('express');
const userAuth = require('express').Router();

const validInput = require('../middlewares/sign_upValidation');
const { sign_up } = require('../controllers/userController');

const app = express();
app.use(express.json());
//user signup route
userAuth.post('/sign_up', validInput,  sign_up);

//authRoute.post('/sign_in', sign_in);

//authRoute.post('/logout', logout);

module.exports = userAuth;