const Productos = require("../models/productosModels");

exports.getAll = (req, res) => {
  Productos.getAll((err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });// llama a todos los productos 
};

exports.getByCategoria = (req, res) => {
  Productos.getByCategoria(req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });//llama la categoria por el id del producto 
};

exports.getIngredientes = (req, res) => {
  Productos.getIngredientes(req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });//llama los ingredientes de cada producto
};


