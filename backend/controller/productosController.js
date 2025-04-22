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

exports.add = (req, res) => {
  Productos.add(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId });
  });//agrega productos nuevos 
};

exports.delete = (req, res) => {
  Productos.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);//elimina productos 
  });
};
