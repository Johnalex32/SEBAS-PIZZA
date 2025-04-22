const Mesas = require("../models/mesasModels");

exports.create = (req, res) => {
  Mesas.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId });
  });//crea numero de mesas 
};

exports.getAll = (req, res) => {
  Mesas.getAll((err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });//llama a todas las mesas
};
