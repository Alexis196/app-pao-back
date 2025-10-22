import { Router } from 'express';
import {obtenerJoyas, agregarJoya, eliminarJoya, actualizarJoya} from '../../controllers/joyas-controller.js'

const router = Router();

router.get('/', obtenerJoyas);

router.post('/', agregarJoya);

router.put('/:_id', actualizarJoya)

router.delete('/:_id', eliminarJoya)

export default router;