import User from '../models/UserSchema.js'
import generateId from '../helpers/generateId.js'

const register = async (req, res) => {
    const {name} = req.body;

    const existingUser = await User.findOne({ name });

    if (existingUser) {
        const error = new Error('Usuario no existe')
        return res.status(404).json({msg:error.message})
    }
    try {
        const user = new User(req.body);
        user.token = generateId();
        await user.save();
        res.status(200).json({msg:'Usuario se ha guardado correctamente'}) 

    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:'Usuario no guardado'})
    }
}

export {
    register
}