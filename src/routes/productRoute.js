const express = require('express');
const productRoute = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts} = require('../controllers/productController');


const app = express();
app.use(express.json());



productRoute.post('/', verifyTokenAndAdmin, createProduct)

productRoute.put('/:id', verifyTokenAndAdmin, updateProduct)

productRoute.delete('/:id', verifyTokenAndAdmin, deleteProduct)

productRoute.get('/:id', verifyTokenAndAdmin, getProduct)

productRoute.get('/', verifyTokenAndAdmin, getAllProducts)


module.exports = productRoute;
