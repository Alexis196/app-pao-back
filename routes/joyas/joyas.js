import { Router } from 'express';
import {obtenerJoyas, agregarJoya, eliminarJoya, actualizarJoya, obtenerUnaJoya} from '../../controllers/joyas-controller.js'

const router = Router();

router.get('/', obtenerJoyas);
router.get('/:_id', obtenerUnaJoya)

router.post('/', agregarJoya);

router.put('/:_id', actualizarJoya)

router.delete('/:_id', eliminarJoya)

export default router;