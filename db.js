import mongoose from 'mongoose';

const conectarDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB);
        console.log(`Base de datos conectada`);
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1); 
    }
};

export default conectarDB;