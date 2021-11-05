const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product_title: { type: String, required: true, unique: true },
    product_desc: { type: String, required: true, },
    product_img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    product_price: { type: Number, required: true },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);