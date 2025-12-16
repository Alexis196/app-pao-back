import Joya from '../models/joyas-model.js';
import mongoose from 'mongoose';

export const obtenerJoyas = async (req, res, next) => {
  try {
    // Parámetros de paginación
    let { page = 1, limit = 10, search = '' } = req.query

    page = parseInt(page)
    limit = Math.min(parseInt(limit), 10)

    const skip = (page - 1) * limit

    // 🔍 Filtro de búsqueda GLOBAL (producto + código numérico)
    const filtro = search
      ? {
          $or: [
            {
              producto: {
                $regex: search,
                $options: 'i'
              }
            },
            {
              $expr: {
                $regexMatch: {
                  input: { $toString: '$codigo' },
                  regex: search,
                  options: 'i'
                }
              }
            }
          ]
        }
      : {}

    // Consulta con filtro + paginación
    const joyas = await Joya.find(filtro)
      .sort({ codigo: 1 })
      .skip(skip)
      .limit(limit)

    // Total acorde al filtro
    const total = await Joya.countDocuments(filtro)
    const totalPaginas = Math.ceil(total / limit)

    res.status(200).json({
      message: 'Joyas obtenidas correctamente',
      joyas,
      paginaActual: page,
      totalPaginas,
      total,
      limite: limit
    })
  } catch (err) {
    console.error('Error al obtener joyas:', err.message)
    next(err)
  }
}


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

export const aumentarPrecios = async (req, res, next) => {
    try {
        const { porcentaje } = req.body;

        if (!porcentaje || isNaN(porcentaje)) {
            return res.status(400).json({ message: "Debe enviar un número válido en 'porcentaje'" });
        }

        const factor = 1 + porcentaje / 100;

        const resultado = await Joya.updateMany({}, [
            { $set: { precio: { $round: [{ $multiply: ["$precio", factor] }, 2] } } }
        ]);

        res.status(200).json({
            message: `Se ajustaron los precios en un ${porcentaje}%`,
            modificados: resultado.modifiedCount
        });

    } catch (err) {
        console.error("Error al ajustaron precios:", err.message);
        next(err);
    }
};

export const bajarPrecios = async (req, res, next) => {
  try {
    const { porcentaje } = req.body;

    if (!porcentaje || isNaN(porcentaje)) {
      return res.status(400).json({ message: "Debe enviar un número válido en 'porcentaje'" });
    }

    const factor = 1 - porcentaje / 100;

    if (factor <= 0) {
      return res.status(400).json({ message: "El porcentaje es demasiado alto, no puede dejar precios negativos o en cero." });
    }

    const resultado = await Joya.updateMany({}, [
      { $set: { precio: { $round: [{ $multiply: ["$precio", factor] }, 2] } } }
    ]);

    res.status(200).json({
      message: `Se redujeron los precios en un ${porcentaje}%`,
      modificados: resultado.modifiedCount
    });

  } catch (err) {
    console.error("Error al reducir precios:", err.message);
    next(err);
  }
};

