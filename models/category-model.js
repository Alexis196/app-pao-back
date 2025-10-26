import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    tipo: { type: String, required: true }
});

const Category = mongoose.model('Category', CategorySchema, 'categories');

export default Category;
