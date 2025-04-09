const Product = require("../models/Product");
const axios = require("axios");

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await Product.find();

    const enrichedProducts = await Promise.all(
      products.map(async (product) => {
        const response = await axios.get(
          `http://localhost:3001/users/${product.createdBy}`
        );
        const user = response.data ?? { userName: null, userEmail: null };

        return {
          _id: product._id,
          name: product.name,
          price: product.price,
          createdBy: product.createdBy,
          userName: user.name,
          userEmail: user.email,
        };
      })
    );

    res.json(enrichedProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    const response = await axios.get(
      `http://localhost:3001/users/${product.createdBy}`
    );
    const user = response.data ?? { userName: null, userEmail: null };

    product.userName = user.name;
    product.userEmail = user.email;

    res.json({
      _id: product._id,
      name: product.name,
      price: product.price,
      createdBy: product.createdBy,
      userName: user.name,
      userEmail: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createProduct, listProduct, getProduct };
