import { Router } from 'express';
import {obtenerJoyas} from '../../controllers/joyas-controller.js'

const router = Router();

router.get('/', obtenerJoyas);

export default router;