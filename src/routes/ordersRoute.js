const ordersRoute = require("express").Router();
const express = require('express');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/verifyToken');

const {
  createOrder,
  deleteOrder,
  updateOrder,
  getAllOrders,
  userOrder,
  monthlyIncome,
} = require('../controllers/orderController');
const app = express();
app.use(express.json());


ordersRoute.post('/', verifyToken, createOrder);

ordersRoute.put('/:id', verifyTokenAndAdmin, updateOrder);

ordersRoute.delete('/:id', verifyTokenAndAdmin, deleteOrder);

ordersRoute.get('/:userId', verifyTokenAndAuthorization, userOrder);

ordersRoute.get('/', verifyTokenAndAdmin, getAllOrders);

ordersRoute.get('/income', verifyTokenAndAdmin, monthlyIncome);

module.exports = ordersRoute;