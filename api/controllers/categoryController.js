import Category from "../models/categorySchema.js";

const registerCategory = async(req, res) => {
    const {name} = req.body;

    try {
        const existingCategory = await Category.findOne({name});

        if (existingCategory) {
            const error = new Error('La categoria ya existe');
            return res.status(400).json({msg: error.message});
        }

        const category = new Category(res.body);
        await category.save();
        
        res.status(200).json({msg:'Categoria guardada correctamente'})

    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'No se guardo la categoria'})
    }
};

export {registerCategory};