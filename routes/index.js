import { Router } from 'express';
import joyasRoute from './joyas/joyas.js'

const router = Router();

router.use("/joyas", joyasRoute)

export default router;