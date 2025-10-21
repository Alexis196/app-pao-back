import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api', indexRoutes);

export default app;