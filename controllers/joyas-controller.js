import Joya from '../models/joyas-model.js';
import mongoose from 'mongoose';

export const obtenerJoyas = async (req, res, next) => {
    try {
        const joyas = await Joya.find();
        res.json(joyas);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};

export const agregarJoya = async (req, res, next) => {
    try {
        const { producto } = req.body;

        if (!producto) {
            return res.status(400).json({ message: "Falta el campo obligatorio: producto" });
        }

        const joyaExistente = await Joya.findOne({ producto });

        if (joyaExistente) {
            return res.status(400).json({
                message: "Ya existe una joya con ese nombre de producto"
            });
        }

        const nuevaJoya = await Joya.create(req.body);

        res.status(201).json({
            message: "Se agregó correctamente el nuevo producto",
            joya: nuevaJoya
        });

    } catch (err) {
        console.error("Error al agregar la joya:", err.message);
        next(err);
    }
};

export const actualizarJoya = async (req, res, next) => {
    try {
        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "El ID proporcionado no es válido" });
        }

        const joyaActualizada = await Joya.findByIdAndUpdate(
            _id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!joyaActualizada) {
            return res.status(404).json({ message: "No se encontró la joya a actualizar" });
        }

        res.status(200).json({
            message: "Joya actualizada correctamente",
            joya: joyaActualizada
        });

    } catch (err) {
        console.error("Error al actualizar la joya:", err.message);
        next(err);
    }
};


export const eliminarJoya = async (req, res, next) => {
    try {
        const { _id } = req.params;

        const joyaEliminada = await Joya.findByIdAndDelete(_id);

        if (!joyaEliminada) {
            return res.status(404).json({ message: "No se encontró la joya a eliminar" });
        }

        res.status(200).json({
            message: "La joya fue eliminada correctamente",
            joya: joyaEliminada
        });

    } catch (err) {
        console.error("Error al eliminar la joya:", err.message);
        next(err);
    }
};

export const obtenerUnaJoya = async (req, res, next) => {
    try {
        const { _id } = req.params;

        // Validar formato de ObjectId
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "El ID proporcionado no es válido" });
        }

        // Buscar por ID directamente
        const joya = await Joya.findById(_id);

        if (!joya) {
            return res.status(404).json({ message: "No se encontró la joya" });
        }

        res.status(200).json({
            message: "Joya encontrada correctamente",
            joya
        });

    } catch (err) {
        console.error("Error al encontrar la joya:", err.message);
        next(err);
    }
};
