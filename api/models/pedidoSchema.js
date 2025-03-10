import mongoose from "mongoose";

const pedidoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
     },
   date: {
      type: Date,
      default: Date.now  // Se asigna automáticamente la fecha actual
   },
   totalAmount: {
      type: Number,
      required: true
   },
   
});

// Crear el modelo de Pedido
const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;