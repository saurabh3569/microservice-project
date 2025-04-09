require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/product.routes");
const { PORT } = require("./constant/env.constant");

const app = express();

connectDB();

app.use(express.json());

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Product Service listening at http://localhost:${PORT}`);
});
