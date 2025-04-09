const router = require("express").Router();
const userController = require("../controllers/user.controllers");

// CREATE
router.post("/", userController.createUser);

// READ ALL
router.get("/", userController.listUser);

// READ ONE
router.get("/:id", userController.getUser);

module.exports = router;
