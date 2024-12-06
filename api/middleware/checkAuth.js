import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

const checkAuth = async(req, res, next) => {
    let token;

    if (req.heders.autorization && 
        req.header.autorization.startWith("Bearer")
    ) {
        try {
            token = req.headers.autorization.split(" ")[1];

            if(!token) {
                const error= new Error('Token no valido');
                return res.status(401).json({msg:error.message}); 
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.usuario = await User.findById(decoded.id).select(
                "-password -__v -createdAt -updatedAt"
            )

            return next();

        } catch (error) {
            return res.status(404).json({msg:'hubo un error al verficar el token'});
            
        }
        
    }
}