const db = require("../config/db");

const Productos = {
  getAll: (callback) => {
    const sql = `SELECT p.*, c.nombre AS categoria FROM PRODUCTOS p JOIN CATEGORIAS c ON p.idCategoria = c.idCategoria`;
    db.query(sql, callback);
  },

  getByCategoria: (idCategoria, callback) => {
    const sql = `
      SELECT p.idProducto, p.nombre, p.precio, p.idCategoria,
             GROUP_CONCAT(i.nombre SEPARATOR ', ') AS ingredientes
      FROM PRODUCTOS p
      LEFT JOIN PRODUCTOS_INGREDIENTES pi ON p.idProducto = pi.idProducto
      LEFT JOIN INGREDIENTES i ON pi.idIngrediente = i.idIngrediente
      WHERE p.idCategoria = ?
      GROUP BY p.idProducto
    `;
    db.query(sql, [idCategoria], (err, results) => {
      if (err) return callback(err);
  
      // Convertir la lista de ingredientes en array
      const productosConIngredientes = results.map(producto => ({
        ...producto,
        ingredientes: producto.ingredientes ? producto.ingredientes.split(",").map(i => i.trim()) : []
      }));
  
      callback(null, productosConIngredientes);
    });
  },
  

  getIngredientes: (idProducto, callback) => {
    const sql = `SELECT i.nombre FROM PRODUCTOS_INGREDIENTES pi JOIN INGREDIENTES i ON pi.idIngrediente = i.idIngrediente WHERE pi.idProducto = ?`;
    db.query(sql, [idProducto], callback);
  },

  add: (producto, callback) => {
    const sql = `INSERT INTO PRODUCTOS SET ?`;
    db.query(sql, [producto], callback);
  },

  delete: (idProducto, callback) => {
    const sql = `DELETE FROM PRODUCTOS WHERE idProducto = ?`;
    db.query(sql, [idProducto], callback);
  }
};

module.exports = Productos;