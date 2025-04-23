const Ingredientes = require("../models/ingredientesModels");

exports.getAll = async (req, res) => {
  try {
    const data = await Ingredientes.getAll();
    res.json(data);
  } catch (err) {
    console.error("Error al obtener ingredientes:", err);
    res.status(500).json({ error: "Error al obtener ingredientes" });
  }
};

exports.getByProducto = (req, res) => {
  Ingredientes.getByProducto(req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};


