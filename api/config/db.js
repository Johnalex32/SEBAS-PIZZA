import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('❌ Error en la conexión a MongoDB:', error.message);
        process.exit(1); // Finaliza la app si hay un error crítico
    }
};

export default connectDB;




