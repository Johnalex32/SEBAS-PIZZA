import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    precio:{
        type: Number,
        required: true,
    }

});

const Product = mongoose.model('Product', productSchema);

export default Product;