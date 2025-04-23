const express = require("express");
const router = express.Router();
const controller = require("../controller/productosController");

router.get("/", controller.getAll);
router.get("/categoria/:id", controller.getByCategoria);
router.get("/:id/ingredientes", controller.getIngredientes);

module.exports = router;
