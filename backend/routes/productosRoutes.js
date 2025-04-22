const express = require("express");
const router = express.Router();
const controller = require("../controller/productosController");

router.get("/", controller.getAll);
router.get("/categoria/:id", controller.getByCategoria);
router.get("/:id/ingredientes", controller.getIngredientes);
router.post("/", controller.add);
router.delete("/:id", controller.delete);

module.exports = router;
