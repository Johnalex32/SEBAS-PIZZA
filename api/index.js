import express from 'express'
import conectDB from "./config/db.js";
import dotenv from 'dotenv';
import { categoryRoute, userRoute, productRoute, pedidoRoute } from "./routes/index.js";



const app = express();
app.use(express.json());

dotenv.config();

conectDB();


app.use('/api/users', userRoute);
app.use('/api/category', categoryRoute);
app.use('/api/products', productRoute);
app.use('/api/pedidos', pedidoRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT,() =>{
    console.log(`Su servicio corriendo en el puerto ${PORT}`);
})