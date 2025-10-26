import { Router } from 'express';
import {
    obtenerCategorias,
    obtenerUnaCategoria,
    agregarCategoria,
    actualizarCategoria,
    eliminarCategoria
} from '../../controllers/category-controller.js';

const router = Router();

router.get('/', obtenerCategorias);
router.get('/:_id', obtenerUnaCategoria);
router.post('/', agregarCategoria);
router.put('/:_id', actualizarCategoria);
router.delete('/:_id', eliminarCategoria);

export default router;
