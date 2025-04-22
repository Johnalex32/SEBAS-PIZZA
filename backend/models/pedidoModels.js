const db = require("../config/db");

const Pedidos = {
  crearPedido: (pedido, items, callback) => {
    const sqlPedido = `INSERT INTO PEDIDOS (idMesa, fecha, nombre, total) VALUES (?, NOW(), ?, ?)`;
    db.query(sqlPedido, [pedido.idMesa, pedido.nombre, pedido.total], (err, result) => {
      if (err) return callback(err);
      const idPedido = result.insertId;

      const sqlItems = `INSERT INTO ORDER_ITEMS (idProducto, cantidad, subtotal, idPedido) VALUES ?`;
      const values = items.map(item => [item.idProducto, item.cantidad, item.subtotal, idPedido]);
      db.query(sqlItems, [values], (err2) => {
        if (err2) return callback(err2);
        callback(null, { idPedido }); // 👈 devolvemos el id del pedido
      });
    });
  },


  obtenerPedidos: (callback) => {
    const query = `
      SELECT p.idPedido, p.nombre, p.idMesa, p.total,
             oi.idProducto, oi.cantidad, oi.subtotal, 
             pr.nombre AS productoNombre, pr.precio,
             GROUP_CONCAT(i.nombre ORDER BY i.nombre) AS ingredientes
      FROM pedidos p
      JOIN order_items oi ON p.idPedido = oi.idPedido
      JOIN productos pr ON oi.idProducto = pr.idProducto
      LEFT JOIN productos_ingredientes pi ON pr.idProducto = pi.idProducto
      LEFT JOIN ingredientes i ON pi.idIngrediente = i.idIngrediente
      GROUP BY p.idPedido, oi.idOrderItem
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener los pedidos:', err);
        return callback(err, null);
      }
  
      const pedidos = [];
  
      results.forEach(row => {
        let pedido = pedidos.find(p => p.idPedido === row.idPedido);
        if (!pedido) {
          pedido = {
            idPedido: row.idPedido,
            nombre: row.nombre,
            idMesa: row.idMesa,
            total: parseFloat(row.total),
            productos: []
          };
          pedidos.push(pedido);
        }
  
        // Convertir ingredientes en array (o vacío si null)
        const ingredientes = row.ingredientes ? row.ingredientes.split(",") : [];
  
        pedido.productos.push({
          productoNombre: row.productoNombre,
          cantidad: row.cantidad,
          subtotal: parseFloat(row.subtotal),
          ingredientes: ingredientes
        });
      });
  
      callback(null, pedidos);
    });
  },

  eliminarPedido: (id, callback) => {
    const queryItems = 'DELETE FROM order_items WHERE idPedido = ?';
    db.query(queryItems, [id], (err) => {
      if (err) return callback(err);
  
      const queryPedido = 'DELETE FROM pedidos WHERE idPedido = ?';
      db.query(queryPedido, [id], (err2) => {
        if (err2) return callback(err2);
  
        // Reiniciar AUTO_INCREMENT en ORDER_ITEMS a 1
        db.query('ALTER TABLE order_items AUTO_INCREMENT = 1', (err3) => {
          if (err3) return callback(err3);
  
          // Reiniciar AUTO_INCREMENT en PEDIDOS a 1 (si es necesario)
          db.query('ALTER TABLE pedidos AUTO_INCREMENT = 1', callback);
        });
      });
    });
  }
};



// ✅ Exportamos el objeto completo
module.exports = Pedidos;
