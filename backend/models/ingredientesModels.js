const db = require("../config/db");

const Ingredientes = {
  getByProducto: (idProducto, callback) => {
    const sql = `SELECT i.nombre FROM PRODUCTOS_INGREDIENTES 
    pi JOIN INGREDIENTES i ON pi.idIngrediente = i.idIngrediente 
    WHERE pi.idProducto = ?`;
    db.query(sql, [idProducto], callback);
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM ingredientes', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  
};


module.exports = Ingredientes;