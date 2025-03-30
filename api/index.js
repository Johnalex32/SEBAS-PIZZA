import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Importa la conexión a MongoDB

// Importar rutas
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import pedidoRoutes from './routes/pedidoRoute.js';

// Configuración de variables de entorno
dotenv.config();

// Inicializar la app
const app = express();

// Middlewares
app.use(express.json());  // Para leer datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Para leer datos de formularios
app.use(cors());  // Habilita el acceso desde otros dominios

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/pedidos', pedidoRoutes);

// Ruta principal para comprobar que el servidor está activo
app.get('/', (req, res) => {
    res.send('🟢 API de Sebas Pizza corriendo correctamente 🚀');
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
});
