import mongoose from 'mongoose';

const joyaSchema = new mongoose.Schema({
    producto: { type: String, required: true, unique: true },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String }
});

const Joya = mongoose.model('Joya', joyaSchema, 'joyas');

export default Joya;
