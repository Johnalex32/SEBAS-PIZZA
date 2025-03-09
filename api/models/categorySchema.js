import mongoose from "mongoose";


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
},
   { timestamps:true}
);

categorySchema.pre('save', function(next){
    next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;