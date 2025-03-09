import mongoose from "mongoose";

const conectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {});
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`mogooseDB conectado en: ${url}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default conectDB;


