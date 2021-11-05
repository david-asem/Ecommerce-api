const cartRoute = require("express").Router();
const express = require('express');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/verifyToken');

const {
  creatCart,
  deleteCart,
  updateCart,
  getAllCarts,
  userCart,
} = require('../controllers/cartController');
const app = express();
app.use(express.json());


cartRoute.post('/', verifyToken, creatCart);

cartRoute.put('/:id', verifyTokenAndAuthorization, updateCart);

cartRoute.delete('/:id', verifyTokenAndAuthorization, deleteCart);

cartRoute.get('/:userId', verifyTokenAndAuthorization, userCart);

cartRoute.get('/', verifyTokenAndAdmin, getAllCarts);



module.exports = cartRoute;