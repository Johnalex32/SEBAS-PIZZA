import express from "express";
import { getPedidosAll, registerPedido, editPedido, getPedidoById, deletePedido } 
from "../controllers/pedidoController.js";

const router = express.Router();

router.post('/registerPedido',registerPedido);
router.get('/',getPedidosAll);
router.put('/editPedidos/:id',editPedido);
router.get('/:id',getPedidoById);
router.delete('/delete/:id',deletePedido);

export default router