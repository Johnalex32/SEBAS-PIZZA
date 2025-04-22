const Categorias = require("../models/categoriaModels");

exports.getAll = (req, res) => {
  Categorias.getAll((err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};
