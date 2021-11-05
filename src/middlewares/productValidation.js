

const validProduct = async (req, res, next) => {
  if (!req.product_title || !req.product_desc || !req.product_price || !req.product_img) {
    return res.status(400).json({
      error: true,
      message:'Missing required product info',
    });
  } else {
    next();
  }
}



module.exports = {
  validProduct,
};