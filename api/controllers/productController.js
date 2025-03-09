import Product from "../models/productSchema.js";

const registerProduct = async (req, res) => {
    const {name} = req.body;

    try {
        const existingProduct = await Product.findOne({name})

        if (existingProduct) {
            const error = new Error('El producto ya existe')
            return res.status(400).json({msg: error.message})
        }

        const product = new Product(req.body);

        await product.save();
        res.status(200).json({msg:'Producto guardado correctamente'})

    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'No se guardo el producto'})        
    }
}

const getProductsAll = async (req, res) => {
    const products = await Product.find();
    try {

        if (!products) {
            return res.status(400).json({msg:'No existe registro del producto'})
        }
        res.status(200).json({msg:'Producto encontrado con exito',products})        
    } catch (error) {
        res.status(500).json({msg:'Error al realizar la peticion'})
    }
}

const editProduct = async(req, res) =>{
    const {id} = req.params;
    const {name, category_id, precio} = req.body;

    try {
        const product = await Product.findById(id)

        if (!product) {
            return res.status(400).json({msg:'Producto no encontrado'})
        }

        product.name = name 
        product.category_id = category_id
        product.precio = precio

        await product.save()

        res.status(200).json({msg:'Producto encontrado', product})
    } catch (error) {
        res.status(500).json({msg:'Error al realizar la peticion'})
    }
}


const getProductById = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(400).json({msg:'Producto no encontrado'})
        }

        res.status(200).json({msg:'Producto encontrado',product})

    } catch (error) {
        res.status(500).json({msg:'Error al realizar la peticion'})
    }
}

const deleteProduct = async(req, res) =>{
    const {id} = req.params
    try {
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(400).json({msg:'Producto no eliminado'})
        }

        await product.deleteOne();

        res.status(200).json({msg:'Producto eliminado'})

    } catch (error) {
        res.status(500).json({msg:'Error al realizar la peticion'})
    }
}

export {registerProduct, getProductsAll, editProduct, getProductById, deleteProduct}