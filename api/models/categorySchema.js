import mongoose from "mongoose";


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: trusted,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

categorySchema.pre('save', function(next){
    next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;