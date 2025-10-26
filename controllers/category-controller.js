import Category from '../models/category-model.js';
import mongoose from 'mongoose';


export const obtenerCategorias = async (req, res, next) => {
    try {
        const categorias = await Category.find().sort({ tipo: 1 }); 
        res.json(categorias);
    } catch (err) {
        console.error("Error al obtener categorías:", err.message);
        next(err);
    }
};


export const obtenerUnaCategoria = async (req, res, next) => {
    try {
        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "El ID proporcionado no es válido" });
        }

        const categoria = await Category.findById(_id);

        if (!categoria) {
            return res.status(404).json({ message: "No se encontró la categoría" });
        }

        res.status(200).json({
            message: "Categoría encontrada correctamente",
            categoria
        });

    } catch (err) {
        console.error("Error al obtener la categoría:", err.message);
        next(err);
    }
};


export const agregarCategoria = async (req, res, next) => {
    try {
        const { tipo } = req.body;

        if (!tipo) {
            return res.status(400).json({ message: "Falta el campo obligatorio: tipo" });
        }

        const categoriaExistente = await Category.findOne({ tipo });

        if (categoriaExistente) {
            return res.status(400).json({ message: "Ya existe una categoría con ese nombre" });
        }

        const nuevaCategoria = await Category.create({ tipo });

        res.status(201).json({
            message: "Categoría agregada correctamente",
            categoria: nuevaCategoria
        });

    } catch (err) {
        console.error("Error al agregar categoría:", err.message);
        next(err);
    }
};

// 🔹 Actualizar categoría
export const actualizarCategoria = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const { tipo } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "El ID proporcionado no es válido" });
        }

        const categoriaActualizada = await Category.findByIdAndUpdate(
            _id,
            { tipo },
            { new: true, runValidators: true }
        );

        if (!categoriaActualizada) {
            return res.status(404).json({ message: "No se encontró la categoría a actualizar" });
        }

        res.status(200).json({
            message: "Categoría actualizada correctamente",
            categoria: categoriaActualizada
        });

    } catch (err) {
        console.error("Error al actualizar categoría:", err.message);
        next(err);
    }
};

// 🔹 Eliminar categoría
export const eliminarCategoria = async (req, res, next) => {
    try {
        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "El ID proporcionado no es válido" });
        }

        const categoriaEliminada = await Category.findByIdAndDelete(_id);

        if (!categoriaEliminada) {
            return res.status(404).json({ message: "No se encontró la categoría a eliminar" });
        }

        res.status(200).json({
            message: "Categoría eliminada correctamente",
            categoria: categoriaEliminada
        });

    } catch (err) {
        console.error("Error al eliminar categoría:", err.message);
        next(err);
    }
};
