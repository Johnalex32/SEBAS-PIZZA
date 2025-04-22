const express = require("express");
const app = express();
const cors = require("cors");
const productosRoutes = require("./routes/productosRoutes");
const categoriasRoutes = require("./routes/categoriaRoutes");
const ingredientesRoutes = require("./routes/ingredientesRoutes");
const pedidosRoutes = require("./routes/pedidoRoutes");
const mesasRoutes = require("./routes/mesasRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/ingredientes", ingredientesRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/mesas", mesasRoutes);

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));