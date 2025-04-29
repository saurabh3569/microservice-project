const Product = require("../models/Product");
const axios = require("axios");

const createProduct = async (req, res) => {
  try {
    const user = await axios
      .get(`http://localhost:8000/users/${product.createdBy}`)
      .then((res) => res.data);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await Product.find();

    const users = await axios
      .get(`http://localhost:8000/users`)
      .then((res) => res.data);

    const userGrouped = {};

    for (const user of users) {
      userGrouped[user._id.toString()] = user;
    }

    const enrichedProducts = [];

    for (const product of products) {
      const user = userGrouped[product.createdBy.toString()];

      enrichedProducts.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        createdBy: product.createdBy,
        userName: user.name,
        userEmail: user.email,
      });
    }

    res.json(enrichedProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    const user = await axios
      .get(`http://localhost:8000/users/${product.createdBy}`)
      .then((res) => res.data);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

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
