import mongoose from 'mongoose';

const joyaSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    producto: { type: String, required: true },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    descripcion: { type: String, required: true }
});

const Joya = mongoose.model('Joya', joyaSchema, 'joyas');

export default Joya;
