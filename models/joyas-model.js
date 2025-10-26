import mongoose from 'mongoose';

const joyaSchema = new mongoose.Schema({
    codigo: { type: Number, required: true, unique: true },
    producto: { type: String, required: true, unique: true },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    descripcion: { type: String },
    tipo: { type: String, required: true }
});

const Joya = mongoose.model('Joya', joyaSchema, 'joyas');

export default Joya;
