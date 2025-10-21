import 'dotenv/config';
import app from './app.js';
import conectarDB from './db.js';

conectarDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto: ${port}`);
});