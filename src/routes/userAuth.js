const express = require('express');
const userAuth = require('express').Router();

const validInput = require('../middlewares/sign_upValidation');
const { verifyTokenAndAuthorization, verifyToken, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const { sign_up, sign_in, updateUserProfile, findUser, findUsers, userStats, deleteUser } = require('../controllers/userController');

const app = express();
app.use(express.json());
//user signup route
userAuth.post('/sign_up', validInput,  sign_up);

userAuth.post('/sign_in', sign_in);

userAuth.put('/user/:id', verifyToken, updateUserProfile);

userAuth.get('/user/:id', verifyTokenAndAdmin, findUser);

userAuth.get('/users', verifyTokenAndAdmin, findUsers);

userAuth.get('/user/stats', verifyTokenAndAdmin, userStats);

userAuth.delete('/user/:id', verifyTokenAndAdmin, deleteUser)

module.exports = userAuth;