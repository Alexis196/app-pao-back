import Joya from '../models/joyas-model.js';

export const obtenerJoyas = async (req, res, next) => {
    try {
        const joyas = await Joya.find();
        res.json(joyas);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};
