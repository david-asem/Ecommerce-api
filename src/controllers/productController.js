const Product = require('../models/Product');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");


//CREATE product

async function createProduct(req, res, next) {
  if (!req.body.product_title || !req.body.product_desc || !req.body.product_price || !req.body.product_img || !req.body.categories) {
    return res.status(400).json({
      error: true,
      message: 'Missing required product info',
    });
  }
  else {
    try {
     const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
  }
};

//UPDATE product
 async function updateProduct (req, res){
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE product
async function deleteProduct(req, res)  {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET PRODUCT
async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL PRODUCTS
async function getAllProducts(req, res) {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};



module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct
}