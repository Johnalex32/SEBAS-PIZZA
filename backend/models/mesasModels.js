const db = require("../config/db");

const Mesas = {
  create: (mesa, callback) => {
    const sql = `INSERT INTO MESAS (numero) VALUES (?)`;
    db.query(sql, [mesa.numero], callback);
  },

  getAll: (callback) => {
    db.query("SELECT * FROM MESAS", callback);
  }
};

module.exports = Mesas;