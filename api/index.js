import express from 'express'
import conectDB from "./config/db.js";
import dotenv from 'dotenv';
import { userRoute } from "./routes/index.js";


const app = express();
app.use(express.json());

dotenv.config();

conectDB();


app.use('/api/users', userRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT,() =>{
    console.log(`Su servicio corriendo en el puerto ${PORT}`);
})