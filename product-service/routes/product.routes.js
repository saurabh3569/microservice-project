const router = require("express").Router();
const productController = require("../controllers/product.controller");

// CREATE
router.post("/", productController.createProduct);

// READ ALL
router.get("/", productController.listProduct);

// READ BY ID
router.get("/:id", productController.getProduct);

module.exports = router;
