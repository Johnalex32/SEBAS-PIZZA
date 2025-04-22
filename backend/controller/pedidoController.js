const Pedidos = require("../models/pedidoModels");

exports.crearPedido = (req, res) => {
  const { pedido, items } = req.body;
  // console.log("Datos recibidos:", pedido, items);
  // console.log("Pedido recibido:", pedido);
  // console.log("Items recibidos:", items);

  Pedidos.crearPedido(pedido, items, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "Pedido creado", id: result.insertId });
  });//crea los pedidos


};
exports.obtenerPedidos = (req, res) => {
  Pedidos.obtenerPedidos((err, pedidos) => {
    if (err) return res.status(500).json({ error: "Error al obtener los pedidos" });
    res.status(200).json(pedidos); //devuelve los pedidos con los productos
  });
};

exports.eliminarPedido = (req, res) => {
  const id = req.params.id;
  Pedidos.eliminarPedido(id, (err, result) => {
    if (err) return res.status(500).json({ error: "Error al eliminar el pedido" });
    res.json({ message: "Pedido eliminado correctamente" });
  });//elimina pedidos
};
