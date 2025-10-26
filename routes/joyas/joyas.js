import express from 'express'
import {
    obtenerJoyas,
    agregarJoya,
    actualizarJoya,
    eliminarJoya,
    obtenerUnaJoya,
    aumentarPrecios
} from '../../controllers/joyas-controller.js'

const router = express.Router()

router.get('/', obtenerJoyas)

router.get('/:_id', obtenerUnaJoya)
router.post('/', agregarJoya)

router.put('/:_id', actualizarJoya)
router.patch('/aumento-precio', aumentarPrecios)

router.delete('/:_id', eliminarJoya)


export default router
