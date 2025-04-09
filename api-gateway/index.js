require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const {
  USER_SERVICE_URL,
  PRODUCT_SERVICE_URL,
  PORT,
} = require("./constant/env.constant");

const app = express();

// Proxy for user-service
app.use(
  "/users",
  createProxyMiddleware({
    target: `${USER_SERVICE_URL}/users`,
    changeOrigin: true,
  })
);

// Proxy for product-service
app.use(
  "/products",
  createProxyMiddleware({
    target: `${PRODUCT_SERVICE_URL}/products`,
    changeOrigin: true,
  })
);

// Default route
app.get("/", (req, res) => {
  res.send("🎯 API Gateway is live!");
});

app.listen(PORT, () => {
  console.log(`🚪 API Gateway running at http://localhost:${PORT}`);
});
