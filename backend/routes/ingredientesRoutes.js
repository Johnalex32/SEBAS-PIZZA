const express = require("express");
const router = express.Router();
const controller = require("../controller/ingredientesController");

router.get('/', controller.getAll);
router.get("/producto/:id", controller.getByProducto);

module.exports = router;