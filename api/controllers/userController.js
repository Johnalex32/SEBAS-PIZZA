import User from '../models/UserSchema.js';


const createUser = async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body); // 🔍 Verifica los datos que llegan

        const { nombre, numeroMesa } = req.body;

        if (!numeroMesa) {
            return res.status(400).json({ error: "El número de mesa es obligatorio y debe ser un número válido." });
        }

        const newUser = new User({ nombre, numeroMesa });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error("❌ Error al guardar en MongoDB:", error);
        res.status(500).json({ error: "Error al guardar el usuario" });
    }
};

// NUEVA FUNCIÓN para obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const usuarios = await User.find();
        res.status(200).json({ data: usuarios });
    } catch (error) {
        console.error('❌ Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

export { createUser, getUsers };
