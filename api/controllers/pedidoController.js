import Pedido from "../models/pedidoSchema.js";

const registerPedido = async (req, res) => {
    const {name} = req.body;

    try {
        const existingPedido = await Pedido.findOne({name})

        if (existingPedido) {
            const error = new Error('El pedido ya existe')
            return res.status(400).json({msg: error.message})
        }

        const pedido = new Pedido(req.body);

        await pedido.save();
        res.status(200).json({msg:'Pedido guardado correctamente'})

    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'No se guardo el pedido'})        
    }
}

const getPedidosAll = async (req, res) => {
    const pedidos = await Pedido.find();
    try {

        if (!pedidos) {
            return res.status(400).json({msg:'No existe registro del pedido'})
        }
        res.status(200).json({msg:'Pedido encontrado con exito',products})        
    } catch (error) {
        res.status(500).json({msg:'Error al realizar la peticion'})
    }
}

const editPedido = async(req, res) =>{
    const {id} = req.params;
    const {name, date, totalAmount} = req.body;

    try {
        const pedido = await Pedido.findById(id)

        if (!pedido) {
            return res.status(400).json({msg:'Pedido no encontrado'})
        }

        product.name = name 
        product.date = date
        product.totalAmount = totalAmount

        await pedido.save()

        res.status(200).json({msg:'Pedido encontrado', pedido})
    } catch (error) {
        res.status(500).json({msg:'Error al realizar la peticion'})
    }
}

const getPedidoById = async (req, res) => {
    const {id} = req.params;
    try {
        const pedido = await Pedido.findById(id);

        if (!pedido) {
            return res.status(400).json({msg:'Pedido no encontrado'})
        }

        res.status(200).json({msg:'Pedido encontrado',pedido})

    } catch (error) {
        res.status(500).json({msg:'Error al realizar la peticion'})
    }
}

const deletePedido = async(req, res) =>{
    const {id} = req.params
    try {
        const pedido = await Pedido.findById(id);
        
        if (!pedido) {
            return res.status(400).json({msg:'Pedido no eliminado'})
        }

        await pedido.deleteOne();

        res.status(200).json({msg:'Pedido eliminado'})

    } catch (error) {
        res.status(500).json({msg:'Error al realizar la peticion'})
    }
}

export {registerPedido, getPedidosAll, editPedido, getPedidoById, deletePedido}