const userRoute = require('express').Router();
const { sign_up } = require('../controllers/userController');

userRoute.get('/sign_up', sign_up);

//userRoute.post('/user/forgotpassword', forgotPassword);


module.exports=userRoute;