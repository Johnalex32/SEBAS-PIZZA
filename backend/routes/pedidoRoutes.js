const express = require("express");
const router = express.Router();
const controller = require("../controller/pedidoController");

router.post("/", controller.crearPedido);
router.get("/", controller.obtenerPedidos);
router.delete("/:id", controller.eliminarPedido);

module.exports = router;