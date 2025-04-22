const db = require("../config/db");

const Categorias = {
  getAll: (callback) => {
    db.query("SELECT * FROM CATEGORIAS", callback);
  }
};

module.exports = Categorias;