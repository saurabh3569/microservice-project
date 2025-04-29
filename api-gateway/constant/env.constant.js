module.exports = {
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || "http://localhost:3001",
  PRODUCT_SERVICE_URL:
    process.env.PRODUCT_SERVICE_URL || "http://localhost:3002",
  PORT: process.env.PORT || 8000,
};
