import { Router } from 'express';
import joyasRoute from './joyas/joyas.js'
import categoryRouter from './Category/Category.js'

const router = Router();

router.use("/joyas", joyasRoute)
router.use('/categories', categoryRouter)

export default router;