import Category from "../models/categorySchema.js";

const registerCategory = async(req, res) => {
    const {name} = req.body;

    try {
        const existingCategory = await Category.findOne({name});

        if (existingCategory) {
            const error = new Error('La categoria ya existe');
            return res.status(400).json({msg: error.message});
        }

        const category = new Category(req.body);

        await category.save();
        
        res.status(200).json({msg:'Categoria guardada correctamente'})

    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'No se guardo la categoria'})
    }
};

const getCategories = async (req, res) => {
    const categories = await Category.find();
    try {

    if(!categories) {
        return res.status(400).json({msg:'No existe registro de categorias'})
    }
    res.status(200).json({msg:'Categorias encontradas con exito',categories})
    }
    catch (error){
        res.status(500).json({msg:'Error al realizar la petición'})
    }

}

const editCategory = async(req, res) =>{
    const {id} = req.params;
    const {name,description} = req.body;
    try{
        const category = await Category.findById(id)

        if(!category){
           return res.status(400).json({msg:'Categoria no encontrada'})     
        }

        category.name = name
        category.description = description

        await category.save()

        res.status(200).json({msg:'Categoria encontrada', category})
    }
    catch (error){
        res.status(500).json({msg:'Error al realizar la petición'})
    }
}

const getCategoryById = async (req, res) => {
    const {id} = req.params;
    try {
        const category = await Category.findById(id)
        
        if (!category) {
            return res.status(400).json({msg:'Categoria no encontrada'})
        }

        res.status(200).json({msg:'Categoria encontrada', category})


    } catch (error) {
        res.status(500).json({msg:'Error al realizar la petición'})
    } 
}

const deleteCategory = async(req, res) =>{
    const {id} = req.params;
    try{
        const category = await Category.findById(id)

        if(!category){
           return res.status(400).json({msg:'Categoria no eliminada'})     
        }

        await category.deleteOne()

        res.status(200).json({msg:'Categoria eliminada'})
    }
    catch (error){
        res.status(500).json({msg:'Error al realizar la petición'})
    }

}

export {registerCategory,getCategories,editCategory,getCategoryById,deleteCategory};